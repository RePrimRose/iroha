package com.example.iroha.service;

import com.example.iroha.dto.projection.KanjiProjection;
import com.example.iroha.dto.test.SelectTestDTO;
import com.example.iroha.dto.test.TestDTO;
import com.example.iroha.entity.Kanji;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.repository.KanjiRepository;
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
public class KanjiService {

    private final KanjiRepository kanjiRepository;
    private final TestProgressService testProgressService;
    private final CorrectAnswerService correctAnswerService;

    public KanjiService(KanjiRepository kanjiRepository, TestProgressService testProgressService, CorrectAnswerService correctAnswerService) {
        this.kanjiRepository = kanjiRepository;
        this.testProgressService = testProgressService;
        this.correctAnswerService = correctAnswerService;
    }

    public Kanji findByKanji(String kanji) {
        return kanjiRepository.findKanjiByKanji(kanji);
    }

    public Page<KanjiProjection> getKanjisByLevel(String level, Pageable pageable) {
        return kanjiRepository.findAllByLevel(level, pageable);
    }

    public Kanji findKanjiById(Long id) {
        return kanjiRepository.findById(id).orElse(null);
    }

    public boolean checkAnswer(Long id, String answer) {
        Kanji kanji = findKanjiById(id);

        return Objects.equals(answer, kanji.getMeanings());
    }

    // 시험을 시작하면 첫 문제를 정하는 함수
    private Kanji findInitialKanji(User user, String type) {
        String level = ScoreUtil.getInitialLevel(user.getScore().getOrDefault(type, 0), type);
        List<Kanji> kanjiList = kanjiRepository.findKanjiTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(kanjiList.size());

        return kanjiList.get(randomIndex);
    }

    // 첫 문제를 푼 뒤 정답에 따라 레벨을 조절해서 다음 문제를 정하는 함수
    private Kanji findNextKanji(User user, String type, String currLevel, boolean isCorrect) {
        String nextLevel = ScoreUtil.getNextLevel(user.getScore().getOrDefault(type, 0), type, currLevel, isCorrect);
        List<Kanji> kanjiList = kanjiRepository.findKanjiTest(nextLevel, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(kanjiList.size());

        return kanjiList.get(randomIndex);
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
    public TestDTO processKanji(User user, TestProgress testProgress, String type, String level, boolean isCorrect) {
        if (testProgressService.isTestOver(user, type)) {
            return testProgressService.isReviewOver(user, type) ? null :
                    convertToDTO(findKanjiById(testProgress.getWrongTestIds().get(type).get(0)));
        }

        Long reviewTestId = testProgressService.isNextReview(user, type)
                ? correctAnswerService.findReviewTestIdByUserId(user.getId(), type)
                : null;

        return reviewTestId != null
                ? convertToDTO(findKanjiById(reviewTestId))
                : level != null
                    ? convertToDTO(findNextKanji(user, type, level, isCorrect))
                    : convertToDTO(findInitialKanji(user, type));
    }

    private SelectTestDTO convertToDTO(Kanji kanji) {
        if (kanji == null) return null;

        return new SelectTestDTO(
                kanji.getId(),
                kanji.getMeanings(),
                kanji.getLevel(),
                kanji.getKanji(),
                getChoices(kanji.getKanji(), kanji.getMeanings())
        );
    }

    /**
     * 문제를 제외한 선택지를 가져와서
     * 선택지 목록을 만들어서 리턴하는 함수
     *
     * @param kanji 문제
     * @param meanings 선택지
     * @return choices
     */
    private List<String> getChoices(String kanji, String meanings) {
        List<Kanji> kanjiList = kanjiRepository.findChoices(kanji);
        List<String> choices = new ArrayList<>();
        choices.add(meanings);
        for (Kanji k : kanjiList) choices.add(k.getMeanings());

        Collections.shuffle(choices);

        return choices;
    }
}
