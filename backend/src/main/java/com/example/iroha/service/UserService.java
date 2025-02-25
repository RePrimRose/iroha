package com.example.iroha.service;

import com.example.iroha.entity.User;
import com.example.iroha.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User findUserByUserId(String userId) {
        return userRepository.findByUserid(userId).orElse(null);
    }

    public User findUserByUserName(String userName) {
        return userRepository.findByUsername(userName).orElse(null);
    }

    public boolean existUserByUserId(String userId) {
        return userRepository.findByUserid(userId).isPresent();
    }

    public boolean existUserByUserName(String userName) {
        return userRepository.findByUsername(userName).isPresent();
    }

    public boolean authenticateUser(String userId, String password) {
        User user = findUserByUserId(userId);
        return passwordEncoder.matches(password, user.getPassword());
    }
}
