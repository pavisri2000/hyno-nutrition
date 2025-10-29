package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.ResourceNotFoundException;
import com.hyno.nutrition.model.Recipe;
import com.hyno.nutrition.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Page<Recipe> getAllRecipes(Pageable pageable) {
        return recipeRepository.findAll(pageable);
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));
    }

    public Page<Recipe> searchRecipes(String query, Pageable pageable) {
        return recipeRepository.searchRecipes(query, pageable);
    }

    public Page<Recipe> getRecipesByMealType(String mealType, Pageable pageable) {
        return recipeRepository.findByMealType(mealType, pageable);
    }

    public Page<Recipe> getRecipesByCuisineType(String cuisineType, Pageable pageable) {
        return recipeRepository.findByCuisineType(cuisineType, pageable);
    }

    public Page<Recipe> getRecipesByVegetarian(Boolean isVegetarian, Pageable pageable) {
        return recipeRepository.findByIsVegetarian(isVegetarian, pageable);
    }

    public List<Recipe> getRecipesByDisease(Long diseaseId) {
        return recipeRepository.findByDiseaseId(diseaseId);
    }

    public List<Recipe> getRecipesByMaxCalories(Integer maxCalories) {
        return recipeRepository.findByMaxCalories(maxCalories);
    }

    public List<Recipe> getRecipesByMealTypeAndCalories(String mealType, Integer calories) {
        return recipeRepository.findByMealTypeAndCaloriesLessThanEqual(mealType, calories);
    }
}
