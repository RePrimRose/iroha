package com.example.iroha.service;

import com.example.iroha.dto.KanjiProjection;
import com.example.iroha.entity.Kanji;
import com.example.iroha.repository.KanjiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class KanjiService {

    private final KanjiRepository kanjiRepository;

    @Autowired
    public KanjiService(KanjiRepository kanjiRepository) {
        this.kanjiRepository = kanjiRepository;
    }

    public Kanji findByKanji(String kanji) {
        return kanjiRepository.findKanjiByKanji(kanji);
    }

    public Page<KanjiProjection> getKanjisByLevel(String level, Pageable pageable) {
        return kanjiRepository.findAllByLevel(level, pageable);
    }
}
