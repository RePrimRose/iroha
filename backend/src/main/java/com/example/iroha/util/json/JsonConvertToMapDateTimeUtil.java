package com.example.iroha.util.json;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.LocalDateTime;
import java.util.Map;

@Converter
public class JsonConvertToMapDateTimeUtil implements AttributeConverter<Map<String, LocalDateTime>, String> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, LocalDateTime> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Map<String, LocalDateTime> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, new TypeReference<Map<String, LocalDateTime>>() {});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
