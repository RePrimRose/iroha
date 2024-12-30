package com.example.iroha.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class TestSentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String sentence;

    @Column(columnDefinition = "TEXT")
    private String translate;

    @Column(columnDefinition = "JSON")
    private String dividedSentence;

    @Column(columnDefinition = "JSON")
    private String dividedSentenceWithRuby;

    @Column(columnDefinition = "TEXT")
    private String sentenceWithRuby;

    @Column(length = 10)
    private String level;
}
