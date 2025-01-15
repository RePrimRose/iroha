package com.example.iroha.repository;

import com.example.iroha.entity.TestSentence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestSentenceRepository extends JpaRepository<TestSentence, Long> {

    List<TestSentence> findBySentenceContaining(String sentence);
}
