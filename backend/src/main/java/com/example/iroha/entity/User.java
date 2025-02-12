package com.example.iroha.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userid;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private int score = 0;

    @Column(nullable = false)
    private int problemsPerDay = 10;

    // 일일 문제 제외 추가 문제 정하기. (아마 문제의 타입별로 정해야 할 것 JSON으로 할지 고민.)

    @Column(nullable = false)
    private double reviewRatio = 0.3;
}
