package com.example.iroha.dto.test;

import com.example.iroha.util.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class InOrderTestDTO extends TestDTO {
    private List<Pair<String, String>> question;

    public InOrderTestDTO(Long id, String answer, List<Pair<String, String>> question) {
        super(id, answer);
        this.question = question;
    }
}
