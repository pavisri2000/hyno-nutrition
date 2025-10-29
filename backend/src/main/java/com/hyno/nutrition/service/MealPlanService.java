package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.ResourceNotFoundException;
import com.hyno.nutrition.model.*;
import com.hyno.nutrition.repository.DailyMealRepository;
import com.hyno.nutrition.repository.MealPlanRepository;
import com.hyno.nutrition.repository.RecipeRepository;
import com.hyno.nutrition.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class MealPlanService {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private DailyMealRepository dailyMealRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BmiCalculatorService bmiCalculatorService;

    public MealPlan generateMealPlan(Long userId, String goal, Integer duration) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Integer targetCal = bmiCalculatorService.calculateTargetCalories(user, goal);

        int breakfastCal = (int)(targetCal * 0.25);
        int lunchCal = (int)(targetCal * 0.35);
        int dinnerCal = (int)(targetCal * 0.30);
        int snackCal = (int)(targetCal * 0.05);

        List<Recipe> breakfasts = recipeRepository.findByMealType("breakfast");
        List<Recipe> lunches = recipeRepository.findByMealType("lunch");
        List<Recipe> dinners = recipeRepository.findByMealType("dinner");
        List<Recipe> snacks = recipeRepository.findByMealType("snack");

        MealPlan plan = new MealPlan();
        plan.setUser(user);
        plan.setGoalType(goal);
        plan.setDuration(duration);
        plan.setTargetCalories(targetCal);
        plan.setStartDate(LocalDate.now());
        plan.setEndDate(LocalDate.now().plusDays(duration));

        List<DailyMeal> dailyMeals = new ArrayList<>();
        Set<Long> recentIds = new HashSet<>();

        for (int day = 1; day <= duration; day++) {
            DailyMeal dailyMeal = new DailyMeal();
            dailyMeal.setDay(day);
            dailyMeal.setBreakfast(selectRecipe(breakfasts, breakfastCal, recentIds));
            dailyMeal.setLunch(selectRecipe(lunches, lunchCal, recentIds));
            dailyMeal.setDinner(selectRecipe(dinners, dinnerCal, recentIds));
            dailyMeal.setSnack1(selectRecipe(snacks, snackCal, recentIds));
            dailyMeal.setSnack2(selectRecipe(snacks, snackCal, recentIds));

            int total = dailyMeal.getBreakfast().getCalories() +
                       dailyMeal.getLunch().getCalories() +
                       dailyMeal.getDinner().getCalories() +
                       dailyMeal.getSnack1().getCalories() +
                       dailyMeal.getSnack2().getCalories();
            dailyMeal.setTotalCalories(total);

            dailyMeals.add(dailyMeal);

            if (day % 7 == 0) recentIds.clear();
        }

        plan.setDailyMeals(dailyMeals);
        return mealPlanRepository.save(plan);
    }

    private Recipe selectRecipe(List<Recipe> recipes, int targetCalories, Set<Long> recentIds) {
        List<Recipe> suitableRecipes = recipes.stream()
                .filter(r -> r.getCalories() <= targetCalories + 100 && r.getCalories() >= targetCalories - 100)
                .filter(r -> !recentIds.contains(r.getId()))
                .toList();

        if (suitableRecipes.isEmpty()) {
            suitableRecipes = recipes.stream()
                    .filter(r -> !recentIds.contains(r.getId()))
                    .toList();
        }

        if (suitableRecipes.isEmpty()) {
            suitableRecipes = recipes;
        }

        Recipe selected = suitableRecipes.get(new Random().nextInt(suitableRecipes.size()));
        recentIds.add(selected.getId());
        return selected;
    }

    public List<MealPlan> getUserMealPlans(Long userId) {
        return mealPlanRepository.findByUserIdOrderByStartDateDesc(userId);
    }

    public MealPlan getMealPlanById(Long id) {
        return mealPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meal plan not found"));
    }

    public void deleteMealPlan(Long id) {
        MealPlan mealPlan = getMealPlanById(id);
        mealPlanRepository.delete(mealPlan);
    }
}
