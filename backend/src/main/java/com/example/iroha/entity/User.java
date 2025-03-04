package com.example.iroha.entity;

import com.example.iroha.util.json.JsonConvertToMapDoubleUtil;
import com.example.iroha.util.json.JsonConvertToMapIntegerUtil;
import com.example.iroha.util.json.JsonConvertToMapLongUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

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

    @Column(columnDefinition = "JSON")
    @Convert(converter = JsonConvertToMapIntegerUtil.class)
    private Map<String, Integer> score = new HashMap<>();

    @Column(columnDefinition = "JSON")
    @Convert(converter = JsonConvertToMapIntegerUtil.class)
    private Map<String, Integer> problemsPerDay = new HashMap<>();

    @Column(columnDefinition = "JSON")
    @Convert(converter = JsonConvertToMapDoubleUtil.class)
    private Map<String, Double> reviewRatio = new HashMap<>();
}
