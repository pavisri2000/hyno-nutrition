package com.hyno.nutrition.controller;

import com.hyno.nutrition.dto.DailyTrackingDto;
import com.hyno.nutrition.model.MealLog;
import com.hyno.nutrition.model.WaterLog;
import com.hyno.nutrition.model.WeightLog;
import com.hyno.nutrition.service.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = "*")
public class TrackingController {

    @Autowired
    private TrackingService trackingService;

    @Autowired
    private com.hyno.nutrition.service.UserService userService;

    // Meal Tracking
    @PostMapping("/meal")
    public ResponseEntity<MealLog> logMeal(
            @RequestParam Long recipeId,
            @RequestParam String mealType,
            @RequestParam Integer quantity,
            @RequestParam LocalDate date,
            Authentication authentication) {

        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        MealLog mealLog = trackingService.logMeal(userId, recipeId, mealType, quantity, date);
        return ResponseEntity.ok(mealLog);
    }

    @GetMapping("/meal/{date}")
    public ResponseEntity<List<MealLog>> getMealLogsForDate(@PathVariable LocalDate date, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<MealLog> mealLogs = trackingService.getMealLogsForDate(userId, date);
        return ResponseEntity.ok(mealLogs);
    }

    // Water Tracking
    @PostMapping("/water")
    public ResponseEntity<WaterLog> logWater(
            @RequestParam Integer glasses,
            @RequestParam LocalDate date,
            Authentication authentication) {

        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        WaterLog waterLog = trackingService.logWater(userId, glasses, date);
        return ResponseEntity.ok(waterLog);
    }

    @GetMapping("/water/{date}")
    public ResponseEntity<WaterLog> getWaterLogForDate(@PathVariable LocalDate date, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        WaterLog waterLog = trackingService.getWaterLogForDate(userId, date).orElse(null);
        return ResponseEntity.ok(waterLog);
    }

    // Weight Tracking
    @PostMapping("/weight")
    public ResponseEntity<WeightLog> logWeight(
            @RequestParam Double weight,
            @RequestParam LocalDate date,
            Authentication authentication) {

        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        WeightLog weightLog = trackingService.logWeight(userId, weight, date);
        return ResponseEntity.ok(weightLog);
    }

    @GetMapping("/weight")
    public ResponseEntity<List<WeightLog>> getWeightLogs(Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<WeightLog> weightLogs = trackingService.getWeightLogs(userId);
        return ResponseEntity.ok(weightLogs);
    }

    // Daily Tracking Summary
    @GetMapping("/daily/{date}")
    public ResponseEntity<DailyTrackingDto> getDailyTracking(@PathVariable LocalDate date, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        DailyTrackingDto dailyTracking = trackingService.getDailyTracking(userId, date);
        return ResponseEntity.ok(dailyTracking);
    }

    // History
    @GetMapping("/history")
    public ResponseEntity<List<DailyTrackingDto>> getTrackingHistory(
            @RequestParam(defaultValue = "7") int days,
            Authentication authentication) {

        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<DailyTrackingDto> history = new java.util.ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < days; i++) {
            LocalDate date = today.minusDays(i);
            DailyTrackingDto dailyTracking = trackingService.getDailyTracking(userId, date);
            history.add(dailyTracking);
        }

        return ResponseEntity.ok(history);
    }
}
