package com.example.iroha.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Kanji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kanji;

    @Column(columnDefinition = "JSON")
    private String meanings;

    @Column(columnDefinition = "JSON")
    private String on;

    @Column(columnDefinition = "JSON")
    private String kun;

    private String pronunciation;

    @Column(length = 10)
    private String level;
}
