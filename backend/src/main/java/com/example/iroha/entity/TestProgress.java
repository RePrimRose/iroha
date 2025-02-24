package com.example.iroha.entity;

import com.example.iroha.util.json.JsonConvertToMapDateTimeUtil;
import com.example.iroha.util.json.JsonConvertToMapIntegerUtil;
import com.example.iroha.util.json.JsonConvertToMapListLongUtil;
import com.example.iroha.util.json.JsonConvertToMapLongUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Convert(converter = JsonConvertToMapLongUtil.class)
    @Column(columnDefinition = "JSON")
    private Map<String, Long> testType = new HashMap<>();;

    @Convert(converter = JsonConvertToMapIntegerUtil.class)
    @Column(columnDefinition = "JSON")
    private Map<String, Integer> totalProgress = new HashMap<>();;

    @Convert(converter = JsonConvertToMapIntegerUtil.class)
    @Column(columnDefinition = "JSON")
    private Map<String, Integer> reviewProgress = new HashMap<>();;

    @Convert(converter = JsonConvertToMapDateTimeUtil.class)
    @Column(columnDefinition = "JSON")
    private Map<String, LocalDateTime> lastSolveTime = new HashMap<>();;

    @Convert(converter = JsonConvertToMapListLongUtil.class)
    @Column(columnDefinition = "JSON")
    private Map<String, List<Long>> wrongTestIds = new HashMap<>();;
}
