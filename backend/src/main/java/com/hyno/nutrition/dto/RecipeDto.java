package com.hyno.nutrition.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private Long id;
    private String name;
    private String ingredients;
    private String preparationSteps;
    private Integer calories;
    private Integer protein;
    private Integer carbs;
    private Integer fats;
    private String allergens;
    private String mealType;
    private String cuisineType;
    private Boolean isVegetarian;
    private Long diseaseId;
}
