package com.example.iroha.util;

import java.text.Normalizer;

public class NormalizeJapaneseText {
    public static String normalizeJapaneseText(String text) {
        text = Normalizer.normalize(text, Normalizer.Form.NFKC);

        return text.replaceAll("[^\\p{IsHiragana}\\p{IsKatakana}\\p{IsHan}\\p{L}]", "").trim();
    }
}
