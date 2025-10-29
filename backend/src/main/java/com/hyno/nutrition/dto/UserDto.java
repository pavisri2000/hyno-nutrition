package com.hyno.nutrition.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private LocalDate dateOfBirth;
    private String gender;
    private Double height;
    private Double weight;
    private Double bmi;
    private String healthGoal;
    private Integer targetCalories;
}
