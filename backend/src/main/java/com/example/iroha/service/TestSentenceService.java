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

    // 시험을 시작하면 첫 문제를 정하는 함수
    public TestSentence findInitialInOrderTest(User user, String type) {
        String level = ScoreUtil.getInitialLevel(user.getScore().getOrDefault(type, 0), type);
        List<TestSentence> testSentences = testSentenceRepository.findInOrderTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(testSentences.size());
        return testSentences.get(randomIndex);
    }

    // 첫 문제를 푼 뒤 정답에 따라 레벨을 조절해서 다음 문제를 정하는 함수
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

    /**
     * 유저의 테스트 진행 상황에 따라
     * 다음 문제를 어떻게 가져올지 판단하는 함수
     * 시험이 끝났다면 null을 리턴
     *
     * @param user 유저의 정보
     * @param testProgress 테스트 진행도
     * @param type 문제의 유형
     * @param level 유저가 방금 풀었던 문제의 난이도
     * @param isCorrect 유저가 방금 풀었던 문제의 정답 여부
     * @return TestDTO(타입에 맞춰서 컨버팅)
     */
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

    /**
     * 문제의 순서를 맞추는 테스트를 위한 함수
     * 나뉘어진 문장을 가져와서 랜덤하게 섞고 그 리스트를 리턴합니다.
     *
     * @param testSentence 문제
     * @return question
     */
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
