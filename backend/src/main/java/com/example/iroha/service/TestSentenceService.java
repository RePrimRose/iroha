package com.example.iroha.service;

import com.example.iroha.dto.test.InOrderTestDTO;
import com.example.iroha.dto.test.TestDTO;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.TestSentence;
import com.example.iroha.entity.User;
import com.example.iroha.repository.TestSentenceRepository;
import com.example.iroha.service.test.TestProgressService;
import com.example.iroha.util.NormalizeJapaneseText;
import com.example.iroha.util.Pair;
import com.example.iroha.util.ScoreUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class TestSentenceService {

    private final TestSentenceRepository testSentenceRepository;
    private final TestProgressService testProgressService;
    private final CorrectAnswerService correctAnswerService;

    public TestSentenceService(TestSentenceRepository testSentenceRepository, TestProgressService testProgressService, CorrectAnswerService correctAnswerService) {
        this.testSentenceRepository = testSentenceRepository;
        this.testProgressService = testProgressService;
        this.correctAnswerService = correctAnswerService;
    }

    public List<TestSentence> getTestSentencesByWord(String sentence) {
        return testSentenceRepository.findBySentenceContaining(sentence);
    }

    public TestSentence findInitialInOrderTest(User user, String type) {
        String level = ScoreUtil.getInitialLevel(user.getScore().getOrDefault(type, 0), type);
        List<TestSentence> testSentences = testSentenceRepository.findInOrderTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(testSentences.size());
        return testSentences.get(randomIndex);
    }

    public TestSentence findNextInOrderTest(User user, String type, String currLevel, boolean isCorrect) {
        String nextLevel = ScoreUtil.getNextLevel(user.getScore().getOrDefault(type, 0), type, currLevel, isCorrect);
        List<TestSentence> testSentences = testSentenceRepository.findInOrderTest(nextLevel, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(testSentences.size());
        return testSentences.get(randomIndex);
    }

    public TestSentence findTestSentenceById(Long id) {
        return testSentenceRepository.findById(id).orElse(null);
    }

    public boolean checkAnswer(Long id, String answer) {
        Optional<TestSentence> sentence = testSentenceRepository.findById(id);
        answer = NormalizeJapaneseText.normalizeJapaneseText(answer);

        return Objects.equals(answer,  NormalizeJapaneseText.normalizeJapaneseText(sentence.get().getSentence()));
    }

    public TestDTO processTestSentence(User user, TestProgress testProgress, String type, String level, boolean isCorrect) {
        if (testProgressService.isTestOver(user, type)) {
            return testProgressService.isReviewOver(user, type) ? null :
                    convertToDTO(findTestSentenceById(testProgress.getWrongTestIds().get(type).get(0)));
        }

        Long reviewTestId = testProgressService.isNextReview(user, type)
                ? correctAnswerService.findReviewTestIdByUserId(user.getId(), type)
                : null;

        return reviewTestId != null
                ? convertToDTO(findTestSentenceById(reviewTestId))
                : level != null
                    ? convertToDTO(findNextInOrderTest(user, type, level, isCorrect))
                    : convertToDTO(findInitialInOrderTest(user, type));
    }

    private InOrderTestDTO convertToDTO(TestSentence testSentence) {
        if (testSentence == null) return null;

        return new InOrderTestDTO(
                testSentence.getId(),
                testSentence.getSentence(),
                testSentence.getLevel(),
                parseQuestion(testSentence),
                testSentence.getTranslate()
        );
    }

    private List<Pair<String, String>> parseQuestion(TestSentence testSentence) {
        List<Pair<String, String>> question = new ArrayList<>();
        List<String> dividedSentence = testSentence.getDividedSentence();
        List<String> dividedSentenceWithRuby = testSentence.getDividedSentenceWithRuby();

        for (int i = 0; i < dividedSentence.size(); i++) {
            question.add(new Pair<>(dividedSentence.get(i), dividedSentenceWithRuby.get(i)));
        }

        Collections.shuffle(question);

        return question;
    }
}
