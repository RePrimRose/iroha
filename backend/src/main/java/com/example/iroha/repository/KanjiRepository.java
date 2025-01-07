package com.example.iroha.repository;

import com.example.iroha.dto.KanjiProjection;
import com.example.iroha.entity.Kanji;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface KanjiRepository extends PagingAndSortingRepository<Kanji, Long> {

    @Query("SELECT k.kanji AS kanji FROM Kanji k WHERE k.level = :level")
    Page<KanjiProjection> findAllByLevel(String level, Pageable pageable);

    Kanji findKanjiByKanji(String kanji);
}
