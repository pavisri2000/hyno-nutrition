package com.hyno.nutrition.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "daily_meals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private MealPlan mealPlan;

    private Integer day; // Day number in the plan (1, 2, 3, ...)

    @ManyToOne
    @JoinColumn(name = "breakfast_id")
    private Recipe breakfast;

    @ManyToOne
    @JoinColumn(name = "lunch_id")
    private Recipe lunch;

    @ManyToOne
    @JoinColumn(name = "dinner_id")
    private Recipe dinner;

    @ManyToOne
    @JoinColumn(name = "snack1_id")
    private Recipe snack1;

    @ManyToOne
    @JoinColumn(name = "snack2_id")
    private Recipe snack2;

    private Integer totalCalories;
}
