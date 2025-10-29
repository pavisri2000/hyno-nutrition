package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.ResourceNotFoundException;
import com.hyno.nutrition.model.*;
import com.hyno.nutrition.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TrackingService {

    @Autowired
    private MealLogRepository mealLogRepository;

    @Autowired
    private WaterLogRepository waterLogRepository;

    @Autowired
    private WeightLogRepository weightLogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private BmiCalculatorService bmiCalculatorService;

    // Meal Tracking
    public MealLog logMeal(Long userId, Long recipeId, String mealType, Integer quantity, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

        MealLog mealLog = new MealLog();
        mealLog.setUser(user);
        mealLog.setRecipe(recipe);
        mealLog.setDate(date);
        mealLog.setMealType(mealType);
        mealLog.setQuantity(quantity);
        mealLog.setCaloriesConsumed(recipe.getCalories() * quantity);

        return mealLogRepository.save(mealLog);
    }

    public List<MealLog> getMealLogsForDate(Long userId, LocalDate date) {
        return mealLogRepository.findByUserIdAndDate(userId, date);
    }

    public Integer getTotalCaloriesForDate(Long userId, LocalDate date) {
        Integer total = mealLogRepository.getTotalCaloriesForDate(userId, date);
        return total != null ? total : 0;
    }

    // Water Tracking
    public WaterLog logWater(Long userId, Integer glasses, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Optional<WaterLog> existingLog = waterLogRepository.findByUserIdAndDate(userId, date);

        WaterLog waterLog;
        if (existingLog.isPresent()) {
            waterLog = existingLog.get();
            waterLog.setGlasses(waterLog.getGlasses() + glasses);
            waterLog.setTotalMl(waterLog.getTotalMl() + (glasses * 250));
        } else {
            waterLog = new WaterLog();
            waterLog.setUser(user);
            waterLog.setDate(date);
            waterLog.setGlasses(glasses);
            waterLog.setTotalMl(glasses * 250);
        }

        return waterLogRepository.save(waterLog);
    }

    public Optional<WaterLog> getWaterLogForDate(Long userId, LocalDate date) {
        return waterLogRepository.findByUserIdAndDate(userId, date);
    }

    public Integer getTotalWaterForDate(Long userId, LocalDate date) {
        Integer total = waterLogRepository.getTotalWaterForDate(userId, date);
        return total != null ? total : 0;
    }

    // Weight Tracking
    public WeightLog logWeight(Long userId, Double weight, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        WeightLog weightLog = new WeightLog();
        weightLog.setUser(user);
        weightLog.setDate(date);
        weightLog.setWeight(weight);

        if (user.getHeight() != null) {
            Double bmi = bmiCalculatorService.calculateBmi(weight, user.getHeight());
            weightLog.setBmi(bmi);
        }

        return weightLogRepository.save(weightLog);
    }

    public List<WeightLog> getWeightLogs(Long userId) {
        return weightLogRepository.findAllByUserIdOrderByDateAsc(userId);
    }

    public List<WeightLog> getRecentWeightLogs(Long userId) {
        return weightLogRepository.findRecentWeightLogs(userId);
    }

    // Daily Tracking Summary
    public DailyTrackingDto getDailyTracking(Long userId, LocalDate date) {
        Integer totalCalories = getTotalCaloriesForDate(userId, date);
        Integer totalWater = getTotalWaterForDate(userId, date);
        List<MealLog> mealLogs = getMealLogsForDate(userId, date);
        Optional<WaterLog> waterLog = getWaterLogForDate(userId, date);
        Optional<WeightLog> weightLog = weightLogRepository.findByUserIdAndDate(userId, date);

        return new DailyTrackingDto(date, totalCalories, totalWater, mealLogs, waterLog.orElse(null), weightLog.orElse(null));
    }
}
