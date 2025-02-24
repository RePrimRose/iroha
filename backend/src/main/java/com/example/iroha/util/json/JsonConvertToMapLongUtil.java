package com.example.iroha.util.json;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Map;

@Converter
public class JsonConvertToMapLongUtil implements AttributeConverter<Map<String, Long>, String> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Long> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Map<String, Long> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, new TypeReference<Map<String, Long>>() {});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
