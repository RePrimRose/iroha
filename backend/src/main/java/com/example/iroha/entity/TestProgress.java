package com.example.iroha.entity;

import com.example.iroha.util.JsonUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class TestProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    private String testType;

    @Column(nullable = false)
    private int totalProgress = 0;

    @Column(nullable = false)
    private int reviewProgress = 0;

    @Column(nullable = false)
    private LocalDateTime lastSolveTime = LocalDateTime.now();

    @Convert(converter = JsonUtil.class)
    private List<Long> wrongTestIds;
}
