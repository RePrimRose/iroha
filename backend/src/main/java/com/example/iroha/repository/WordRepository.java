package com.example.iroha.repository;

import com.example.iroha.dto.WordProjection;
import com.example.iroha.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends PagingAndSortingRepository<Word, Long> {

    @Query("SELECT w.word AS word, w.furigana AS furigana FROM Word w WHERE w.level = :level")
    Page<WordProjection> findAllByLevel(String level, Pageable pageable);

    Word findWordByWord(String word);
}
