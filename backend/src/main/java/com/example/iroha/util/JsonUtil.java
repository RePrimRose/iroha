package com.example.iroha.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.util.List;

public class JsonUtil implements AttributeConverter<List<Long>, String> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Long> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Long> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, new TypeReference<List<Long>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
