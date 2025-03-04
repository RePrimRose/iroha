package com.example.iroha.dto.test;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class SelectTestDTO extends TestDTO {
    private String question;
    private List<String> choices;

    public SelectTestDTO(Long id, String answer, String level, String question, List<String> choices) {
        super(id, answer, level);
        this.question = question;
        this.choices = choices;
    }
}
