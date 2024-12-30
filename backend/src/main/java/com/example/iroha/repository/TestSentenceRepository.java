package com.example.iroha.repository;

import com.example.iroha.entity.TestSentence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestSentenceRepository extends JpaRepository<TestSentence, Long> {
}
