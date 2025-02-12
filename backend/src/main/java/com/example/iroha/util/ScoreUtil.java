package com.example.iroha.util;

public class ScoreUtil {

    public static String getGrade(int score) {
        if(score <= 421) {
            return "N5";
        } else if(score <= 887) {
            return "N4";
        } else if(score <= 2071) {
            return "N3";
        } else if(score <= 4350) {
            return "N2";
        } else {
            return "N1";
        }
    }
}
