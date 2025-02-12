package com.example.iroha.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String furigana;

    @Column(nullable = false)
    private String meaning;

    @Column(length = 10)
    private String level;
}
