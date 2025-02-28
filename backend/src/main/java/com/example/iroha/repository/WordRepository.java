package com.example.iroha.repository;

import com.example.iroha.dto.projection.WordProjection;
import com.example.iroha.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("SELECT w.word AS word, w.furigana AS furigana FROM Word w WHERE w.level = :level")
    Page<WordProjection> findAllByLevel(String level, Pageable pageable);

    Word findWordByWord(String word);

    @Query("SELECT w AS word FROM Word w WHERE w.level =:level AND w.id NOT IN (SELECT ca.itemId FROM CorrectAnswer ca WHERE ca.type = :type)")
    List<Word> findWordTest(String level, String type);

    @Query("SELECT w AS word FROM Word w WHERE NOT w.word = :word ORDER BY rand() LIMIT 3")
    List<Word> findChoices(String word);
}
