package com.example.iroha.dto.test;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FillBlankTestDTO extends TestDTO {
    private String question;

    public FillBlankTestDTO(Long id, String answer, String level, String question) {
        super(id, answer, level);
        this.question = question;
    }
}
