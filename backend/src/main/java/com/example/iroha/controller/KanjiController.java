package com.example.iroha.controller;

import com.example.iroha.dto.projection.KanjiProjection;
import com.example.iroha.entity.Kanji;
import com.example.iroha.service.KanjiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kanji")
public class KanjiController {

    private final KanjiService kanjiService;

    @Autowired
    public KanjiController(KanjiService kanjiService) {
        this.kanjiService = kanjiService;
    }

    @GetMapping("/list")
    public Page<KanjiProjection> getKanjisByLevel(
            @RequestParam String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return kanjiService.getKanjisByLevel(level, pageable);
    }

    @GetMapping("/detail")
    public Kanji getKanjiByKanji(@RequestParam String kanji) {
        return kanjiService.findByKanji(kanji);
    }

}
