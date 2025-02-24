package com.example.iroha.entity;

import com.example.iroha.util.json.JsonConvertToListStringUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter @Setter @ToString
public class TestSentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String sentence;

    @Column(columnDefinition = "TEXT")
    private String translate;

    @Convert(converter = JsonConvertToListStringUtil.class)
    @Column(columnDefinition = "JSON")
    private List<String> dividedSentence;

    @Convert(converter = JsonConvertToListStringUtil.class)
    @Column(columnDefinition = "JSON")
    private List<String> dividedSentenceWithRuby;

    @Column(columnDefinition = "TEXT")
    private String sentenceWithRuby;

    @Column(length = 10)
    private String level;
}
