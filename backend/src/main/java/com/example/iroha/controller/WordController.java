package com.example.iroha.controller;

import com.example.iroha.dto.projection.WordProjection;
import com.example.iroha.entity.Word;
import com.example.iroha.service.WordService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/word")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/list")
    public Page<WordProjection> getWordsByLevel(
            @RequestParam String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return wordService.getWordsByLevel(level, pageable);
    }

    @GetMapping("/detail")
    public Word getWordbyWord(@RequestParam String word) {
        return wordService.findByWord(word);
    }
}
