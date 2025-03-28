package com.example.iroha.util;

import lombok.Getter;

@Getter
public class Pair<F, S> {
    private final F first;
    private final S second;

    public Pair(F first, S second) {
        this.first = first;
        this.second = second;
    }
}
