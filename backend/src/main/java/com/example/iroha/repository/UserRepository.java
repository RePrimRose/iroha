package com.example.iroha.repository;

import com.example.iroha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserid(String userid);
    User findByUsername(String username);
}
