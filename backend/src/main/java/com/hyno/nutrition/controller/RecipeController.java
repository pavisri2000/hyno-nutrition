package com.hyno.nutrition.controller;

import com.hyno.nutrition.model.Recipe;
import com.hyno.nutrition.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public ResponseEntity<Page<Recipe>> getAllRecipes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String mealType,
            @RequestParam(required = false) String cuisineType,
            @RequestParam(required = false) Boolean vegetarian,
            @RequestParam(required = false) Integer maxCalories) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Recipe> recipes = recipeService.getAllRecipes(pageable, mealType, cuisineType, vegetarian, maxCalories);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Recipe recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        List<Recipe> recipes = recipeService.searchRecipes(query);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/by-disease/{diseaseId}")
    public ResponseEntity<List<Recipe>> getRecipesByDisease(@PathVariable Long diseaseId) {
        List<Recipe> recipes = recipeService.getRecipesByDisease(diseaseId);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/by-meal-type/{mealType}")
    public ResponseEntity<List<Recipe>> getRecipesByMealType(@PathVariable String mealType) {
        List<Recipe> recipes = recipeService.getRecipesByMealType(mealType);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/by-cuisine/{cuisineType}")
    public ResponseEntity<List<Recipe>> getRecipesByCuisine(@PathVariable String cuisineType) {
        List<Recipe> recipes = recipeService.getRecipesByCuisine(cuisineType);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/vegetarian")
    public ResponseEntity<List<Recipe>> getVegetarianRecipes() {
        List<Recipe> recipes = recipeService.getVegetarianRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/max-calories/{maxCalories}")
    public ResponseEntity<List<Recipe>> getRecipesByMaxCalories(@PathVariable Integer maxCalories) {
        List<Recipe> recipes = recipeService.getRecipesByMaxCalories(maxCalories);
        return ResponseEntity.ok(recipes);
    }
}
