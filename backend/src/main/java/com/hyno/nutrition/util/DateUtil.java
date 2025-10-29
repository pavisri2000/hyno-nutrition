package com.hyno.nutrition.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static String formatDate(LocalDate date) {
        return date.format(DATE_FORMATTER);
    }

    public static LocalDate parseDate(String dateString) {
        return LocalDate.parse(dateString, DATE_FORMATTER);
    }

    public static LocalDate getToday() {
        return LocalDate.now();
    }

    public static LocalDate getYesterday() {
        return LocalDate.now().minusDays(1);
    }

    public static LocalDate getTomorrow() {
        return LocalDate.now().plusDays(1);
    }
}
