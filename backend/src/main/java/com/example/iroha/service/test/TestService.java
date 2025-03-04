package com.example.iroha.service.test;

import com.example.iroha.dto.RequestData;
import com.example.iroha.dto.test.TestDTO;
import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TestService {

    private final CorrectAnswerService correctAnswerService;
    private final TestProgressService testProgressService;
    private final TestSentenceService testSentenceService;
    private final KanjiService kanjiService;
    private final WordService wordService;
    private final UserService userService;

    public Map<String, Object> getNextTest(String userId, RequestData requestData) {
        String type = requestData.getType();
        User user = userService.findUserByUserId(userId);
        TestProgress testProgress = testProgressService.getTestProgress(user, type);
        String level = requestData.getLevel();
        boolean isCorrect = requestData.getIsCorrect();

        TestDTO testDTO = null;
        if (Objects.equals(type, "sentence-inOrder")) {
            testDTO = testSentenceService.processTestSentence(user, testProgress, type, level, isCorrect);
        } else if (Objects.equals(type, "kanji-kanji")) {
            testDTO = kanjiService.processKanji(user, testProgress, type, level, isCorrect);
        } else if (Objects.equals(type, "word-word")) {
            testDTO = wordService.processWord(user, testProgress, type, level, isCorrect);
        }

        return buildResponse(testDTO, testProgress, user, type);
    }

    public TestProgress getTestProgress(String userId) {
        User user = userService.findUserByUserId(userId);
        return testProgressService.getTestProgress(user);
    }

    public void setTestSettings(String userId, Integer problem, Double review, String type) {
        User user = userService.findUserByUserId(userId);
        user.getProblemsPerDay().put(type, problem);
        user.getReviewRatio().put(type, review);
        userService.updateUser(user);
    }

    public boolean processAnswer(String userId, RequestData requestData, String type) {
        User user = userService.findUserByUserId(userId);

        if (requestData.getAnswer() == null) return false;

        boolean isCorrect = false;

        if (Objects.equals(type, "sentence-inOrder")) {
            isCorrect = testSentenceService.checkAnswer(requestData.getTestId(), requestData.getAnswer());
        } else if (Objects.equals(type, "kanji-kanji")) {
            isCorrect = kanjiService.checkAnswer(requestData.getTestId(), requestData.getAnswer());
        } else if (Objects.equals(type, "word-word")) {
            isCorrect = wordService.checkAnswer(requestData.getTestId(), requestData.getAnswer());
        }

        if (isCorrect) {
            Map<String, Integer> scores = user.getScore();
            Integer score = scores.getOrDefault(type, 0);
            score++;
            scores.put(type, score);
            user.setScore(scores);
            userService.updateUser(user);
        }

        CorrectAnswer correctAnswer = correctAnswerService.findCorrectAnswerByItemId(requestData.getTestId(), type, user.getId());

        if (correctAnswer == null) {
            correctAnswerService.saveCorrectAnswer(user.getUserid(), type, requestData.getTestId(), isCorrect);
            testProgressService.updateTestProgress(user, requestData.getTestId(), type, isCorrect, false);
        } else {
            correctAnswerService.updateCorrectAnswer(user, correctAnswer);
            testProgressService.updateTestProgress(user, requestData.getTestId(), type, isCorrect, true);
        }

        return isCorrect;
    }

    private Map<String, Object> buildResponse(TestDTO testDTO, TestProgress testProgress, User user, String type) {
        Map<String, Object> response = new HashMap<>();
        response.put("test", testDTO);
        response.put("currProgress", testProgress.getTotalProgress().get(type));
        response.put("totalProgress", user.getProblemsPerDay().get(type));
        return response;
    }
}
