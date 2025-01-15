package com.example.iroha.service;

import com.example.iroha.entity.TestSentence;
import com.example.iroha.repository.TestSentenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TestSentenceService {

    private final TestSentenceRepository testSentenceRepository;

    public TestSentenceService(TestSentenceRepository testSentenceRepository) {
        this.testSentenceRepository = testSentenceRepository;
    }

    public List<TestSentence> getTestSentencesByWord(String sentence) {
        return testSentenceRepository.findBySentenceContaining(sentence);
    }
}
