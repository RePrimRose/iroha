package com.example.iroha.repository;

import com.example.iroha.entity.TestSentence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestSentenceRepository extends JpaRepository<TestSentence, Long> {

    List<TestSentence> findBySentenceContaining(String sentence);

    @Query("SELECT ts FROM TestSentence ts WHERE ts.level = :level AND ts.id NOT IN (SELECT ca.itemId FROM CorrectAnswer ca WHERE ca.type = :type)")
    List<TestSentence> findInOrderTest(String level, String type);

    @Query("SELECT ts FROM TestSentence ts WHERE ts.sentence LIKE concat('%', :word, '%') AND ts.id NOT IN (SELECT ca.itemId FROM CorrectAnswer ca WHERE ca.type = :type)")
    List<TestSentence> findFillBlankTest(String word, String type);
}
