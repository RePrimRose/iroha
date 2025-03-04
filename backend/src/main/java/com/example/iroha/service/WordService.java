package com.example.iroha.service;

import com.example.iroha.dto.projection.WordProjection;
import com.example.iroha.dto.test.SelectTestDTO;
import com.example.iroha.dto.test.TestDTO;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.entity.Word;
import com.example.iroha.repository.WordRepository;
import com.example.iroha.service.test.TestProgressService;
import com.example.iroha.util.ScoreUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class WordService {

    private final WordRepository wordRepository;
    private final TestProgressService testProgressService;
    private final CorrectAnswerService correctAnswerService;

    public WordService(WordRepository wordRepository, TestProgressService testProgressService, CorrectAnswerService correctAnswerService) {
        this.wordRepository = wordRepository;
        this.testProgressService = testProgressService;
        this.correctAnswerService = correctAnswerService;
    }

    public Page<WordProjection> getWordsByLevel(String level, Pageable pageable) {
        return wordRepository.findAllByLevel(level, pageable);
    }

    public Word findByWord(String word) {
        return wordRepository.findWordByWord(word);
    }

    public Word findWordById(Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    public boolean checkAnswer(Long id, String answer) {
        Word word = findWordById(id);

        return Objects.equals(answer, word.getMeaning());
    }

    private Word findInitialWord(User user, String type) {
        String level = ScoreUtil.getInitialLevel(user.getScore().getOrDefault(type, 0), type);
        List<Word> wordList = wordRepository.findWordTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(wordList.size());

        return wordList.get(randomIndex);
    }

    private Word findNextWord(User user, String type, String currLevel, boolean isCorrect) {
        String nextLevel = ScoreUtil.getNextLevel(user.getScore().getOrDefault(type, 0), type, currLevel, isCorrect);
        List<Word> wordList = wordRepository.findWordTest(nextLevel, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(wordList.size());

        return wordList.get(randomIndex);
    }

    public TestDTO processWord(User user, TestProgress testProgress, String type, String level, boolean isCorrect) {
        if (testProgressService.isTestOver(user, type)) {
            return testProgressService.isReviewOver(user, type) ? null :
                    convertToDTO(findWordById(testProgress.getWrongTestIds().get(type).get(0)));
        }

        Long reviewTestId = testProgressService.isNextReview(user, type)
                ? correctAnswerService.findReviewTestIdByUserId(user.getId(), type)
                : null;

        return reviewTestId != null
                ? convertToDTO(findWordById(reviewTestId))
                : level != null
                    ? convertToDTO(findNextWord(user, type, level, isCorrect))
                    : convertToDTO(findInitialWord(user, type));
    }

    private SelectTestDTO convertToDTO(Word word) {
        if (word == null) return null;

        return new SelectTestDTO(
                word.getId(),
                word.getMeaning(),
                word.getLevel(),
                word.getWord(),
                getChoices(word.getWord(), word.getMeaning())
        );
    }

    private List<String> getChoices(String word, String meanings) {
        List<Word> wordList = wordRepository.findChoices(word);
        List<String> choices = new ArrayList<>();
        choices.add(meanings);
        for (Word w : wordList) choices.add(w.getMeaning());

        Collections.shuffle(choices);

        return choices;
    }
}
