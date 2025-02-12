package com.example.iroha.repository;

import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;

public interface TestProgressRepository extends JpaRepository<TestProgress, Long> {
    TestProgress findByUser(User user);
}
