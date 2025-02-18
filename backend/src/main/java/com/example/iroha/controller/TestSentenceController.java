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
            else {
                testSentence = testSentenceService.findTestSentenceById(testProgress.getWrongTestIds().get(0));
            }
        } else {
            Long reviewTestId = null;

            if(testProgressService.isNextReview(user)) {
                reviewTestId = correctAnswerService.findReviewTestIdByUserId(user.getId(), type);
            }

            testSentence = (reviewTestId != null)
                    ? testSentenceService.findTestSentenceById(reviewTestId)
                    : testSentenceService.findNextInOrderTest(user, type);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("testSentence", testSentence);
        response.put("isCorrect", isCorrect);
        response.put("currProgress", testProgress.getTotalProgress());
        response.put("totalProgress", user.getProblemsPerDay());

        return ResponseEntity.ok(response);
    }
}
