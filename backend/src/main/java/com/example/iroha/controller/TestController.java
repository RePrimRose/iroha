package com.example.iroha.controller;

import com.example.iroha.JwtUtil;
import com.example.iroha.dto.RequestData;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.service.test.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;
    private final JwtUtil jwtUtil;

    @PostMapping("/getTestProgress")
    public ResponseEntity<?> getTestProgress(@RequestHeader("Authorization") String token) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        TestProgress testProgress = testService.getTestProgress(userid);
        Map<String, Object> response = new HashMap<>();

        response.put("totalProgress", testProgress.getTotalProgress());
        response.put("problemPerDay", testProgress.getUser().getProblemsPerDay());
        response.put("reviewRatio", testProgress.getUser().getReviewRatio());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/settings")
    public ResponseEntity<?> setTestSettings(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> requestBody) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        String type = (String) requestBody.get("type");
        Integer problemPerDay = (Integer) requestBody.get("problemPerDay");
        Integer reviewRatio = (Integer) requestBody.get("reviewRatio");
        testService.setTestSettings(userid, problemPerDay, reviewRatio / 100.0, type);

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/check-answer")
    public ResponseEntity<?> checkAnswer(@RequestHeader("Authorization") String token, @RequestBody RequestData requestData) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        boolean isCorrect = testService.processAnswer(userid, requestData, requestData.getType());

        return ResponseEntity.ok(Map.of("isCorrect", isCorrect));
    }

    @PostMapping("/get-test")
    public ResponseEntity<?> getTest(@RequestHeader("Authorization") String token, @RequestBody RequestData requestData) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        return ResponseEntity.ok(testService.getNextTest(userid, requestData));
    }
}
