package com.example.iroha.util.json;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;
import java.util.Map;

@Converter
public class JsonConvertToMapListLongUtil implements AttributeConverter<Map<String, List<Long>>, String> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, List<Long>> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Map<String, List<Long>> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, new TypeReference<Map<String, List<Long>>>() {});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
