package com.example.iroha.service;

import com.example.iroha.entity.TestSentence;
import com.example.iroha.entity.User;
import com.example.iroha.repository.TestSentenceRepository;
import com.example.iroha.util.ScoreUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class TestSentenceService {

    private final TestSentenceRepository testSentenceRepository;
    private final CorrectAnswerService correctAnswerService;

    public TestSentenceService(TestSentenceRepository testSentenceRepository, CorrectAnswerService correctAnswerService) {
        this.testSentenceRepository = testSentenceRepository;
        this.correctAnswerService = correctAnswerService;
    }

    public List<TestSentence> getTestSentencesByWord(String sentence) {
        return testSentenceRepository.findBySentenceContaining(sentence);
    }

    public TestSentence findNextInOrderTest(User user, String type) {
        String level = ScoreUtil.getGrade(user.getScore());
        List<TestSentence> testSentences = testSentenceRepository.findInOrderTest(level, type);
        int randomIndex = ThreadLocalRandom.current().nextInt(testSentences.size());
        return testSentences.get(randomIndex);
    }

    public TestSentence findTestSentenceById(Long id) {
        return testSentenceRepository.findById(id).orElse(null);
    }

    public boolean checkAnswer(Long id, String answer) {
        Optional<TestSentence> sentence = testSentenceRepository.findById(id);
        return Objects.equals(answer, sentence.get().getSentence());
    }
}
