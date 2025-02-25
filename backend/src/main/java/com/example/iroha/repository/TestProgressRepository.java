package com.example.iroha.repository;

import com.example.iroha.entity.TestProgress;
import com.example.iroha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface TestProgressRepository extends JpaRepository<TestProgress, Long> {
    TestProgress findByUser(User user);
}
