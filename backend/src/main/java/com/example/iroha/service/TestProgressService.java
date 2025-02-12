package com.example.iroha.service;

import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.repository.TestProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestProgressService {

    private final TestProgressRepository testProgressRepository;

    public TestProgressService(TestProgressRepository testProgressRepository) {
        this.testProgressRepository = testProgressRepository;
    }

    public TestProgress getTestProgress(User user) {
        return testProgressRepository.findByUser(user);
    }

    public void createTestProgress(User user) {
        TestProgress testProgress = new TestProgress();
        testProgress.setUser(user);
        testProgressRepository.save(testProgress);
    }

    public void updateTestProgress(User user, Long id, boolean isCorrect, boolean isReview) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        List<Long> wrongIds = testProgress.getWrongTestIds();

        if(isReview) {
            testProgress.setReviewProgress(testProgress.getReviewProgress() + 1);
        }
        testProgress.setTotalProgress(testProgress.getTotalProgress() + 1);
        testProgress.setLastSolveTime(LocalDateTime.now());

        if(!isCorrect) {
            if(wrongIds == null) wrongIds = new ArrayList<>();
            wrongIds.add(id);
            testProgress.setWrongTestIds(wrongIds);
        }

        testProgressRepository.save(testProgress);
    }

    /* 다음 문제의 유형 판단 */
    public boolean isNextReview(User user) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        return testProgress.getReviewProgress() < user.getProblemsPerDay() * user.getReviewRatio();
    }

    /* 테스트 끝 여부 판단 */
    public boolean isTestOver(User user) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        return testProgress.getTotalProgress() == user.getProblemsPerDay();
    }

    /* 테스트가 끝 이후 틀린 문제 여부 판단 */
    public boolean isReviewOver(User user) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        List<Long> wrongIds = testProgress.getWrongTestIds();
        if (wrongIds == null) {
            return true;
        }
        return wrongIds.isEmpty();
    }
}
