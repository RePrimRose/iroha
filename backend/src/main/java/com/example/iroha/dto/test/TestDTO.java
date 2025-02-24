package com.example.iroha.dto.test;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public abstract class TestDTO {
    private Long id;
    private String answer;

    public TestDTO(Long id, String answer) {
        this.id = id;
        this.answer = answer;
    }
}
