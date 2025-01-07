package com.example.iroha.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "kanji")
@Entity
@Getter @Setter
public class Kanji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kanji")
    private String kanji;

    @Column(columnDefinition = "JSON")
    private String meanings;

    @Column(columnDefinition = "JSON")
    private String onYomi;

    @Column(columnDefinition = "JSON")
    private String kunYomi;

    private String pronunciation;

    @Column(length = 10)
    private String level;
}
