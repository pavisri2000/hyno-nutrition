package com.hyno.nutrition.controller;

import com.hyno.nutrition.dto.MealPlanRequest;
import com.hyno.nutrition.model.MealPlan;
import com.hyno.nutrition.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meal-plans")
@CrossOrigin(origins = "*")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @Autowired
    private com.hyno.nutrition.service.UserService userService;

    @PostMapping("/generate")
    public ResponseEntity<MealPlan> generateMealPlan(@RequestBody MealPlanRequest request, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        MealPlan mealPlan = mealPlanService.generateMealPlan(userId, request.getGoal(), request.getDuration());
        return ResponseEntity.ok(mealPlan);
    }

    @GetMapping
    public ResponseEntity<List<MealPlan>> getUserMealPlans(Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<MealPlan> mealPlans = mealPlanService.getUserMealPlans(userId);
        return ResponseEntity.ok(mealPlans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> getMealPlanById(@PathVariable Long id) {
        MealPlan mealPlan = mealPlanService.getMealPlanById(id);
        return ResponseEntity.ok(mealPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return ResponseEntity.noContent().build();
    }
}
