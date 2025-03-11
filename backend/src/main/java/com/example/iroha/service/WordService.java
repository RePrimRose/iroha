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

    // 시험을 시작하면 첫 문제를 정하는 함수
    private Word findInitialWord(User user, String type) {
        String level = ScoreUtil.getInitialLevel(user.getScore().getOrDefault(type, 0), type);
        List<Word> wordList = wordRepository.findWordTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(wordList.size());

        return wordList.get(randomIndex);
    }

    // 첫 문제를 푼 뒤 정답에 따라 레벨을 조절해서 다음 문제를 정하는 함수
    private Word findNextWord(User user, String type, String currLevel, boolean isCorrect) {
        String nextLevel = ScoreUtil.getNextLevel(user.getScore().getOrDefault(type, 0), type, currLevel, isCorrect);
        List<Word> wordList = wordRepository.findWordTest(nextLevel, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(wordList.size());

        return wordList.get(randomIndex);
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

    /**
     * 문제를 제외한 선택지를 가져와서
     * 선택지 목록을 만들어서 리턴하는 함수
     *
     * @param word 문제
     * @param meanings 선택지
     * @return choices
     */
    private List<String> getChoices(String word, String meanings) {
        List<Word> wordList = wordRepository.findChoices(word);
        List<String> choices = new ArrayList<>();
        choices.add(meanings);
        for (Word w : wordList) choices.add(w.getMeaning());

        Collections.shuffle(choices);

        return choices;
    }
}
