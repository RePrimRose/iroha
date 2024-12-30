package com.example.iroha.service;

import com.example.iroha.repository.TestSentenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestSentenceService {

    private TestSentenceRepository testSentenceRepository;

    @Autowired
    public TestSentenceService(TestSentenceRepository testSentenceRepository) {
        this.testSentenceRepository = testSentenceRepository;
    }
}
