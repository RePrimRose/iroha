package com.example.iroha.dto.test;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public abstract class TestDTO {
    private Long id;
    private String answer;
    private String level;

    public TestDTO(Long id, String answer, String level) {
        this.id = id;
        this.answer = answer;
        this.level = level;
    }
}
