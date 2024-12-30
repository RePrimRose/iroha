package com.example.iroha.repository;

import com.example.iroha.entity.Kanji;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KanjiRepository extends JpaRepository<Kanji, Long> {
}
