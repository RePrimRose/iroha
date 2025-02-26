package com.example.iroha.repository;

import com.example.iroha.dto.projection.KanjiProjection;
import com.example.iroha.entity.Kanji;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiRepository extends JpaRepository<Kanji, Long> {

    @Query("SELECT k.kanji AS kanji FROM Kanji k WHERE k.level = :level")
    Page<KanjiProjection> findAllByLevel(String level, Pageable pageable);

    Kanji findKanjiByKanji(String kanji);

    @Query("SELECT k AS kanji FROM Kanji k WHERE k.level = :level AND k.id NOT IN (SELECT ca.itemId FROM CorrectAnswer ca WHERE ca.type = :type)")
    List<Kanji> findKanjiTest(String level, String type);

    @Query("SELECT k AS kanji FROM Kanji k WHERE NOT k.kanji = :kanji ORDER BY rand() LIMIT 3")
    List<Kanji> findChoices(String kanji);
}
