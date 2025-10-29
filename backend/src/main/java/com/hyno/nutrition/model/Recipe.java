package com.hyno.nutrition.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String ingredients; // JSON array string

    @Column(length = 3000)
    private String preparationSteps; // JSON array string

    private Integer calories;

    private Integer protein; // in grams

    private Integer carbs; // in grams

    private Integer fats; // in grams

    @Column(length = 500)
    private String allergens; // JSON array string

    private String mealType; // breakfast, lunch, dinner, snack

    private String cuisineType; // South Indian, North Indian, etc.

    private Boolean isVegetarian = true;

    @ManyToOne
    @JoinColumn(name = "disease_id")
    private Disease disease;
}
