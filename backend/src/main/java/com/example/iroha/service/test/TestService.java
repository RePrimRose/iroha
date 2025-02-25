package com.example.iroha.service.test;

import com.example.iroha.dto.RequestData;
import com.example.iroha.dto.test.TestDTO;
import com.example.iroha.entity.CorrectAnswer;
import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.service.CorrectAnswerService;
import com.example.iroha.service.TestProgressService;
import com.example.iroha.service.TestSentenceService;
import com.example.iroha.service.UserService;
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
    private final UserService userService;

    public Map<String, Object> getNextTest(String userId, RequestData requestData) {
        String type = requestData.getType();
        User user = userService.findUserByUserId(userId);
        TestProgress testProgress = testProgressService.getTestProgress(user, type);

        boolean isCorrect = processAnswer(user, requestData, type);
        TestDTO testDTO = null;
        if (Objects.equals(type, "sentence-inOrder")) {
            testDTO = testSentenceService.processTestSentence(user, testProgress, type);
        }

        return buildResponse(testDTO, isCorrect, testProgress, user, type);
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

    private boolean processAnswer(User user, RequestData requestData, String type) {
        if (requestData.getAnswer() == null) return false;

        boolean isCorrect = false;

        if (Objects.equals(type, "sentence-inOrder")) {
            isCorrect = testSentenceService.checkAnswer(requestData.getTestId(), requestData.getAnswer());
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

    private Map<String, Object> buildResponse(TestDTO testDTO, boolean isCorrect, TestProgress testProgress, User user, String type) {
        Map<String, Object> response = new HashMap<>();
        response.put("test", testDTO);
        response.put("isCorrect", isCorrect);
        response.put("currProgress", testProgress.getTotalProgress().get(type));
        response.put("totalProgress", user.getProblemsPerDay().get(type));
        return response;
    }
}
