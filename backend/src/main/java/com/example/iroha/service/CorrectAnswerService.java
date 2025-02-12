package com.example.iroha.service;

import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.User;
import com.example.iroha.repository.CorrectAnswerRepository;
import com.example.iroha.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CorrectAnswerService {

    private final CorrectAnswerRepository correctAnswerRepository;
    private final UserRepository userRepository;

    public CorrectAnswerService(CorrectAnswerRepository correctAnswerRepository, UserRepository userRepository) {
        this.correctAnswerRepository = correctAnswerRepository;
        this.userRepository = userRepository;
    }

    public void saveCorrectAnswer(String userId, String type, Long itemId, boolean isCorrect) {
        User user = userRepository.findByUserid(userId).orElseThrow(IllegalArgumentException::new);

        CorrectAnswer correctAnswer = new CorrectAnswer();
        correctAnswer.setUser(user);
        correctAnswer.setType(type);
        correctAnswer.setItemId(itemId);
        correctAnswer.setReceivedScore(isCorrect);

        if(isCorrect) {
            correctAnswer.setReviewTime(LocalDateTime.now().plusDays(30));
            correctAnswer.setDays(30);
        } else {
            correctAnswer.setReviewTime(LocalDateTime.now().plusDays(1));
            correctAnswer.setDays(1);
        }

        correctAnswerRepository.save(correctAnswer);
    }

    public void updateCorrectAnswer(User user, CorrectAnswer correctAnswer) {
        if(correctAnswer.getReviewTime().isAfter(LocalDateTime.now().plusWeeks(1)) && !correctAnswer.isReceivedScore()) {
            correctAnswer.setReceivedScore(true);
        }

        correctAnswer.setReviewTime(LocalDateTime.now().plusDays(correctAnswer.getDays()));
        correctAnswer.setDays(correctAnswer.getDays() * 2);

        correctAnswerRepository.save(correctAnswer);
    }

    public List<CorrectAnswer> findCorrectAnswerByUserId(Long userId, String type) {
        return correctAnswerRepository.findByUserAndType(userId, type);
    }

    public CorrectAnswer findCorrectAnswerByItemId(Long itemId, String type, Long userId) {
        CorrectAnswer correctAnswer = correctAnswerRepository.findByItemIdAndTypeAndUserId(itemId, type, userId);
        if(correctAnswer != null && correctAnswer.getReviewTime().isAfter(LocalDateTime.now())) return null;
        return correctAnswer;
    }
}
