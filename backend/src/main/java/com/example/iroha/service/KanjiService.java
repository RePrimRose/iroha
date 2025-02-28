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

    private Kanji findNextKanji(User user, String type) {
        String level = ScoreUtil.getGrade(user.getScore());
        List<Kanji> kanjiList = kanjiRepository.findKanjiTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(kanjiList.size());

        return kanjiList.get(randomIndex);
    }

    public TestDTO processKanji(User user, TestProgress testProgress, String type) {
        if (testProgressService.isTestOver(user, type)) {
            return testProgressService.isReviewOver(user, type) ? null :
                    convertToDTO(findKanjiById(testProgress.getWrongTestIds().get(type).get(0)));
        }

        Long reviewTestId = testProgressService.isNextReview(user, type)
                ? correctAnswerService.findReviewTestIdByUserId(user.getId(), type)
                : null;

        return reviewTestId != null
                ? convertToDTO(findKanjiById(reviewTestId))
                : convertToDTO(findNextKanji(user, type));
    }

    private SelectTestDTO convertToDTO(Kanji kanji) {
        if (kanji == null) return null;

        return new SelectTestDTO(
                kanji.getId(),
                kanji.getMeanings(),
                kanji.getKanji(),
                getChoices(kanji.getKanji(), kanji.getMeanings())
        );
    }

    private List<String> getChoices(String kanji, String meanings) {
        List<Kanji> kanjiList = kanjiRepository.findChoices(kanji);
        List<String> choices = new ArrayList<>();
        choices.add(meanings);
        for (Kanji k : kanjiList) choices.add(k.getMeanings());

        Collections.shuffle(choices);

        return choices;
    }
}
