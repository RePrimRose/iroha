package com.example.iroha.service;

import com.example.iroha.dto.WordProjection;
import com.example.iroha.entity.Word;
import com.example.iroha.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WordService {

    private final WordRepository wordRepository;

    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public Page<WordProjection> getWordsByLevel(String level, Pageable pageable) {
        return wordRepository.findAllByLevel(level, pageable);
    }

    public Word findByWord(String word) {
        return wordRepository.findWordByWord(word);
    }
}
