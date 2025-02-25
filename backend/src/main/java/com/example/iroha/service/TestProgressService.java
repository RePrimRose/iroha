package com.example.iroha.service;

import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import com.example.iroha.repository.TestProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
    public TestProgress getTestProgress(User user, String type) {
        TestProgress testProgress = testProgressRepository.findByUser(user);

        if (testProgress == null) {
            testProgress = new TestProgress();
            testProgress.setUser(user);
        }

        Map<String, LocalDateTime> lastSolveTime = testProgress.getLastSolveTime();
        boolean isToday = lastSolveTime.containsKey(type) && lastSolveTime.get(type).toLocalDate().equals(LocalDate.now());

        if(!isToday) {
            Map<String, Integer> reviewProgress = testProgress.getReviewProgress();
            Map<String, Integer> totalProgress = testProgress.getTotalProgress();
            Map<String, List<Long>> wrongTestIds = testProgress.getWrongTestIds();
            List<Long> wrongTestIdList = new ArrayList<>();
            wrongTestIds.put(type, wrongTestIdList);

            totalProgress.put(type, 0);
            reviewProgress.put(type, 0);
            lastSolveTime.put(type, LocalDateTime.now());

            testProgress.setReviewProgress(reviewProgress);
            testProgress.setTotalProgress(totalProgress);
            testProgress.setLastSolveTime(lastSolveTime);
            testProgress.setWrongTestIds(wrongTestIds);
        }

        testProgressRepository.save(testProgress);

        return testProgress;
    }

    public TestProgress getTestProgress(User user) {
        TestProgress testProgress = testProgressRepository.findByUser(user);

        if (testProgress == null) {
            testProgress = new TestProgress();
            testProgress.setUser(user);
            testProgressRepository.save(testProgress);
        }

        return testProgress;
    }

    public void updateTestProgress(User user, Long id, String type, boolean isCorrect, boolean isReview) {
        TestProgress testProgress = getTestProgress(user, type);

        Map<String, Integer> reviewProgress = testProgress.getReviewProgress();
        Map<String, Integer> totalProgress = testProgress.getTotalProgress();
        Map<String, List<Long>> wrongTestIds = testProgress.getWrongTestIds();
        Map<String, LocalDateTime> lastSolveTime = testProgress.getLastSolveTime();

        List<Long> wrongIds = wrongTestIds.computeIfAbsent(type, k -> new ArrayList<>());

        if(isReview && !wrongIds.contains(id)) reviewProgress.put(type, reviewProgress.get(type) + 1);
        if(isCorrect) totalProgress.put(type, totalProgress.get(type) + 1);

        if(!isCorrect && !wrongIds.contains(id)) wrongIds.add(id);
        if(isCorrect && isReview) wrongIds.remove(id);

        lastSolveTime.put(type, LocalDateTime.now());

        testProgress.setReviewProgress(reviewProgress);
        testProgress.setTotalProgress(totalProgress);
        testProgress.setLastSolveTime(lastSolveTime);

        testProgressRepository.save(testProgress);
    }

    /* 다음 문제의 유형 판단 */
    public boolean isNextReview(User user, String type) {
        TestProgress testProgress = getTestProgress(user, type);

        Map<String, Integer> reviewProgress = testProgress.getReviewProgress();
        Map<String, Integer> problemPerDay = user.getProblemsPerDay();
        Map<String, Double> reviewRatio = user.getReviewRatio();

        return reviewProgress.get(type) < problemPerDay.get(type) * reviewRatio.get(type);
    }

    /* 테스트 끝 여부 판단 */
    public boolean isTestOver(User user, String type) {
        TestProgress testProgress = getTestProgress(user, type);

        Map<String, Integer> totalProgress = testProgress.getTotalProgress();
        Map<String, Integer> problemPerDay = user.getProblemsPerDay();
        Map<String, List<Long>> wrongTestIds = testProgress.getWrongTestIds();

        return totalProgress.get(type) + wrongTestIds.get(type).size() >= problemPerDay.get(type);
    }

    /* 테스트가 끝 이후 틀린 문제 여부 판단 */
    public boolean isReviewOver(User user, String type) {
        TestProgress testProgress = getTestProgress(user, type);
        List<Long> wrongIds = testProgress.getWrongTestIds().computeIfAbsent(type, k -> new ArrayList<>());;

        return wrongIds.isEmpty();
    }
}
