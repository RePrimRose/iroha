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
    private final TestProgressService testProgressService;
    private final CorrectAnswerService correctAnswerService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/example")
    public List<TestSentence> getSentencesByWord(@RequestParam String word) {
        return testSentenceService.getTestSentencesByWord(word);
    }

    @PostMapping("/inOrderTest")
    public ResponseEntity<?> getNextInOrderTest(
            @RequestHeader("Authorization") String token,
            @RequestBody RequestData requestData)
    {
        String type = requestData.getType();
        String answer = requestData.getAnswer();
        Long testId = requestData.getTestId();
        boolean isCorrect = false;
        TestSentence testSentence = new TestSentence();
        String userid = jwtUtil.extractUserid(token.substring(7));
        User user = userService.findUserByUserId(userid);
        TestProgress testProgress = testProgressService.getTestProgress(user);

        if(testProgress == null) testProgressService.createTestProgress(user);

        if(answer != null) {
            CorrectAnswer correctAnswer = correctAnswerService.findCorrectAnswerByItemId(testId, type, user.getId());
            isCorrect = testSentenceService.checkAnswer(testId, answer);
            if(correctAnswer != null) {
                correctAnswerService.updateCorrectAnswer(user, correctAnswer);
                testProgressService.updateTestProgress(user, testId, isCorrect, true);
            } else {
                correctAnswerService.saveCorrectAnswer(userid, type, testId, isCorrect);
                testProgressService.updateTestProgress(user, testId, isCorrect, false);
            }
        }

        if(testProgressService.isTestOver(user)) {
            if(testProgressService.isReviewOver(user)) return ResponseEntity.ok("Test Over");
        } else {
            // 리뷰 문제 제출 방식 고치기
            if(testProgressService.isNextReview(user) && correctAnswerService.findCorrectAnswerByItemId(testId, type, user.getId()) != null) {
                testSentence = testSentenceService.findTestSentenceById(testId);
            } else {
                testSentence = testSentenceService.findNextInOrderTest(user, type);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("testSentence", testSentence);
        response.put("isCorrect", isCorrect);
        // 유저 정보 그대로 주지 말고 현재 풀어야하는 전체 문제 수, 현재 푼 문제만 주기
        response.put("currProgress", testProgress.getTotalProgress() + testProgress.getReviewProgress());
        response.put("totalProgress", user.getProblemsPerDay());

        return ResponseEntity.ok(response);
    }
}
