package com.example.iroha.controller;

import com.example.iroha.JwtUtil;
import com.example.iroha.entity.User;
import com.example.iroha.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class LoginController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> requestBody) {
        if (userService.authenticateUser(requestBody.get("userid"), requestBody.get("password"))) {
            String token = jwtUtil.generateToken(requestBody.get("userid"));
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("에러");
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestHeader("Authorization") String token) {
        try {
            String userid = jwtUtil.extractUserid(token.substring(7));
            return ResponseEntity.ok(Map.of("userid", userid));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/id-check")
    public ResponseEntity<?> idCheck(@RequestBody Map<String, String> requestBody) {
        String userid = requestBody.get("userid");
        boolean exists = userService.existUserByUserId(userid);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @PostMapping("/name-check")
    public ResponseEntity<?> nameCheck(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        boolean exists = userService.existUserByUserName(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}