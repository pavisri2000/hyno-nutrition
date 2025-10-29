package com.hyno.nutrition.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "meal_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String goalType; // WEIGHT_LOSS, WEIGHT_GAIN, MAINTENANCE

    private Integer duration; // in days

    private Integer targetCalories;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DailyMeal> dailyMeals;
}
