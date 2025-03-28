package com.example.iroha.service;

import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.User;
import com.example.iroha.repository.CorrectAnswerRepository;
import com.example.iroha.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CorrectAnswerService {

    private final CorrectAnswerRepository correctAnswerRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public CorrectAnswerService(CorrectAnswerRepository correctAnswerRepository, UserRepository userRepository, UserService userService) {
        this.correctAnswerRepository = correctAnswerRepository;
        this.userRepository = userRepository;
        this.userService = userService;
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

    /**
     * 풀어본 문제의 데이터를 갱신합니다.
     * 틀렸던 문제였고 일정 회수 복습을 했다면
     * 점수를 받습니다.
     *
     * @param user 유저
     * @param type 문제의 유형
     * @param correctAnswer 문제 기록
     */
    public void updateCorrectAnswer(User user, String type, CorrectAnswer correctAnswer) {
        if(correctAnswer.getReviewTime().isAfter(LocalDateTime.now().plusWeeks(1)) && !correctAnswer.isReceivedScore()) {
            Map<String, Integer> scores = user.getScore();
            Integer score = scores.getOrDefault(type, 0);
            score++;
            scores.put(type, score);
            user.setScore(scores);
            userService.updateUser(user);
            correctAnswer.setReceivedScore(true);
        }

        correctAnswer.setReviewTime(LocalDateTime.now().plusDays(correctAnswer.getDays()));
        correctAnswer.setDays(correctAnswer.getDays() * 2);

        correctAnswerRepository.save(correctAnswer);
    }

    /**
     * 복습을 해야하는 문제가 있다면
     * 그 문제의 id 값을 리턴합니다.
     * 없다면 null을 리턴합니다.
     *
     * @param userId 유저 id
     * @param type 문제의 유형
     * @return itemId
     */
    public Long findReviewTestIdByUserId(Long userId, String type) {
        List<CorrectAnswer> correctAnswerList = correctAnswerRepository.findByUserAndType(userId, type);

        if(correctAnswerList.isEmpty()) return null;

        CorrectAnswer correctAnswer = correctAnswerList.get(0);

        if(correctAnswer.getReviewTime().isBefore(LocalDateTime.now())) return correctAnswer.getItemId();

        return null;
    }

    public CorrectAnswer findCorrectAnswerByItemId(Long itemId, String type, Long userId) {
        return correctAnswerRepository.findByItemIdAndTypeAndUserId(itemId, type, userId);
    }
}
