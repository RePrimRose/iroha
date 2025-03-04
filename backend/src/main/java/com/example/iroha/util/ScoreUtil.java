package com.example.iroha.util;

import com.example.iroha.entity.User;

public class ScoreUtil {
    private static final int[] KANJI_LEVELS = {103, 284, 608, 1023, 2136, 6731};
    private static final int[] WORD_LEVELS = {220, 527, 1043, 1828, 2755, 5988};
    private static final int[] SENTENCE_LEVELS = {202, 491, 965, 1664, 2445, 4228};

    private static final String[] LEVEL_NAMES = {"N5", "N4", "N3", "N2", "N1"};

    public static String getInitialLevel(int score, String type) {
        int[] thresholds = new int[0];

        thresholds = switch (type) {
            case "kanji-kanji" -> KANJI_LEVELS;
            case "word-word" -> WORD_LEVELS;
            case "sentence-inOrder" -> SENTENCE_LEVELS;
            default -> thresholds;
        };

        return determineLevel(score, thresholds);
    }

    private static String determineLevel(int score, int[] thresholds) {
        for (int i = thresholds.length - 1; i >= 0; i--) {
            if (score >= thresholds[i]) {
                return LEVEL_NAMES[i];
            }
        }
        return "N5";
    }

    public static String getNextLevel(int score, String type, String level, boolean isCorrect) {
        String userLevel = getInitialLevel(score, type);
        int currentIndex = getLevelIndex(level);
        int maxIndex = getLevelIndex(userLevel);

        if (isCorrect) {
            return currentIndex < 4 ? LEVEL_NAMES[currentIndex + 1] : level;
        } else {
            return currentIndex != 0 ? LEVEL_NAMES[currentIndex - 1] : level;
        }
    }

    private static int getLevelIndex(String level) {
        for (int i = 0; i < LEVEL_NAMES.length; i++) {
            if (LEVEL_NAMES[i].equals(level)) return i;
        }
        return 0;
    }
}
