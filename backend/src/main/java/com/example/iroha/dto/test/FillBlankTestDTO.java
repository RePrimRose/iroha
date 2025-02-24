package com.example.iroha.dto.test;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FillBlankTestDTO extends TestDTO {
    private String question;

    public FillBlankTestDTO(Long id, String answer, String question) {
        super(id, answer);
        this.question = question;
    }
}
