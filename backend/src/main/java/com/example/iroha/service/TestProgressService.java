package com.example.iroha.service;

import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.repository.TestProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestProgressService {

    private final TestProgressRepository testProgressRepository;

    public TestProgressService(TestProgressRepository testProgressRepository) {
        this.testProgressRepository = testProgressRepository;
    }

    /**
     * 사용자의 테스트 진행 상황을 가져옵니다.
     * 만약 사용자의 마지막 풀이 날짜가 오늘과 다르면,
     * 총 진행도(totalProgress)와 복습 진행도(reviewProgress)를 초기화합니다.
     *
     * @param user 테스트 진행도를 조회할 사용자 객체
     * @return 사용자의 {@link TestProgress} 객체
     */
    public TestProgress getTestProgress(User user) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        boolean isToday = testProgress.getLastSolveTime().toLocalDate().equals(LocalDate.now());

        if(!isToday) {
            testProgress.setReviewProgress(0);
            testProgress.setTotalProgress(0);
            testProgress.setWrongTestIds(new ArrayList<>());
        }

        return testProgress;
    }

    public void createTestProgress(User user) {
        TestProgress testProgress = new TestProgress();
        testProgress.setUser(user);
        testProgressRepository.save(testProgress);
    }

    public void updateTestProgress(User user, Long id, boolean isCorrect, boolean isReview) {
        TestProgress testProgress = testProgressRepository.findByUser(user);
        List<Long> wrongIds = testProgress.getWrongTestIds();

        if(isReview) testProgress.setReviewProgress(testProgress.getReviewProgress() + 1);
        if(isCorrect) testProgress.setTotalProgress(testProgress.getTotalProgress() + 1);
        testProgress.setLastSolveTime(LocalDateTime.now());

        if(!isCorrect) {
            if(wrongIds == null) wrongIds = new ArrayList<>();
            if(!wrongIds.contains(id)) {
                wrongIds.add(id);
                testProgress.setWrongTestIds(wrongIds);
            }
        } else if(isReview && wrongIds != null) {
            wrongIds.remove(id);
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
        return testProgress.getTotalProgress() >= user.getProblemsPerDay();
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
