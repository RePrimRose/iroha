package com.example.iroha.service;

import com.example.iroha.repository.KanjiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KanjiService {

    private final KanjiRepository kanjiRepository;

    @Autowired
    public KanjiService(KanjiRepository kanjiRepository) {
        this.kanjiRepository = kanjiRepository;
    }
}
