package com.example.iroha.repository;

import com.example.iroha.entity.CorrectAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorrectAnswerRepository extends JpaRepository<CorrectAnswer, Long> {

    @Query("SELECT c FROM CorrectAnswer c WHERE c.user.id = :userId AND c.type = :type ORDER BY c.reviewTime ASC ")
    List<CorrectAnswer> findByUserAndType(@Param("userId") Long userId, @Param("type") String type);

    @Query("SELECT c FROM CorrectAnswer c WHERE c.itemId = :itemId AND c.type = :type AND c.user.id = :userId")
    CorrectAnswer findByItemIdAndTypeAndUserId(Long itemId, String type, Long userId);
}
