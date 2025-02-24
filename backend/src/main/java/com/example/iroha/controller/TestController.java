package com.example.iroha.controller;

import com.example.iroha.JwtUtil;
import com.example.iroha.service.test.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;
    private final JwtUtil jwtUtil;

    public TestController(TestService testService) {
        this.testService = testService;
        this.jwtUtil = new JwtUtil();
    }

    @GetMapping("/getTestProgress")
    public ResponseEntity<?> getTestProgress(@RequestHeader("Authorization") String token, @RequestParam String type) {
        String userid = jwtUtil.extractUserid(token.substring(7));

        return ResponseEntity.ok(testService.getTestProgress(userid, type));
    }

    @PostMapping("/settings")
    public ResponseEntity<?> setTestSettings(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> requestBody) {
        String userid = jwtUtil.extractUserid(token.substring(7));
        String type = (String) requestBody.get("type");
        Integer problemPerDay = (Integer) requestBody.get("problemPerDay");
        Long reviewRatio = (Long) requestBody.get("reviewRatio");
        testService.setTestSettings(userid, problemPerDay, reviewRatio, type);

        return ResponseEntity.ok(Map.of("success", true));
    }
}
