package com.example.iroha.controller;

import com.example.iroha.entity.TestSentence;
import com.example.iroha.service.TestSentenceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sentence")
public class TestSentenceController {

    private final TestSentenceService testSentenceService;

    public TestSentenceController(TestSentenceService testSentenceService) {
        this.testSentenceService = testSentenceService;
    }

    @GetMapping("/example")
    public List<TestSentence> getSentencesByWord(@RequestParam String word) {
        return testSentenceService.getTestSentencesByWord(word);
    }
}
