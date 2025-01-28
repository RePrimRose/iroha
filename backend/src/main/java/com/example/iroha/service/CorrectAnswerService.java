package com.example.iroha.service;

import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.User;
import com.example.iroha.repository.CorrectAnswerRepository;
import com.example.iroha.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorrectAnswerService {

    private final CorrectAnswerRepository correctAnswerRepository;
    private final UserRepository userRepository;

    public CorrectAnswerService(CorrectAnswerRepository correctAnswerRepository, UserRepository userRepository) {
        this.correctAnswerRepository = correctAnswerRepository;
        this.userRepository = userRepository;
    }

    public void saveCorrectAnswer(String userId, String type, Long itemId) {
        User user = userRepository.findByUserid(userId).orElseThrow(IllegalArgumentException::new);
    }

    public List<CorrectAnswer> findCorrectAnswerByItemId(Long itemId, String type) {
        return correctAnswerRepository.findByUserAndType(itemId, type);
    }
}
