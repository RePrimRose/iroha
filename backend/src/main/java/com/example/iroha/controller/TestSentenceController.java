package com.example.iroha.controller;

import com.example.iroha.JwtUtil;
import com.example.iroha.dto.RequestData;
import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.TestSentence;
import com.example.iroha.entity.User;
import com.example.iroha.service.CorrectAnswerService;
import com.example.iroha.service.TestProgressService;
import com.example.iroha.service.TestSentenceService;
import com.example.iroha.service.UserService;
import com.example.iroha.service.test.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/inOrderTest/check-answer")
    public ResponseEntity<?> checkAnswer(
            @RequestHeader("Authorization") String token,
            @RequestBody RequestData requestData)
    {
        String answer = requestData.getAnswer();
        boolean isCorrect = testSentenceService.checkAnswer(requestData.getTestId(), answer);

        return ResponseEntity.ok(Map.of("isCorrect", isCorrect));
    }

    @PostMapping("/inOrderTest")
    public ResponseEntity<?> getNextInOrderTest(
            @RequestHeader("Authorization") String token,
            @RequestBody RequestData requestData) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        return ResponseEntity.ok(testService.getNextTest(userid, requestData));
    }
}
