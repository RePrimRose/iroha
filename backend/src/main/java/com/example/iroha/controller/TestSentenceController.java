package com.example.iroha.controller;

import com.example.iroha.JwtUtil;
import com.example.iroha.entity.TestSentence;
import com.example.iroha.service.TestSentenceService;
import com.example.iroha.service.test.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sentence")
public class TestSentenceController {

    private final TestSentenceService testSentenceService;
    private final TestService testService;
    private final JwtUtil jwtUtil;

    @GetMapping("/example")
    public List<TestSentence> getSentencesByWord(@RequestParam String word) {
        return testSentenceService.getTestSentencesByWord(word);
    }
}
