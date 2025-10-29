package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.InvalidDataException;
import com.hyno.nutrition.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class BmiCalculatorService {

    public Double calculateBmi(Double weight, Double height) {
        if (weight == null || height == null || height == 0) {
            throw new InvalidDataException("Weight and height required");
        }
        double heightInMeters = height / 100.0;
        double bmi = weight / (heightInMeters * heightInMeters);
        return Math.round(bmi * 10.0) / 10.0;
    }

    public String getBmiCategory(Double bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    public Integer calculateTargetCalories(User user, String goal) {
        int age = Period.between(user.getDateOfBirth(), LocalDate.now()).getYears();
        double bmr;

        if ("Male".equalsIgnoreCase(user.getGender())) {
            bmr = (10 * user.getWeight()) + (6.25 * user.getHeight()) - (5 * age) + 5;
        } else {
            bmr = (10 * user.getWeight()) + (6.25 * user.getHeight()) - (5 * age) - 161;
        }

        int maintenance = (int) (bmr * 1.55);

        switch (goal.toUpperCase()) {
            case "WEIGHT_LOSS": return maintenance - 500;
            case "WEIGHT_GAIN": return maintenance + 500;
            default: return maintenance;
        }
    }
}
