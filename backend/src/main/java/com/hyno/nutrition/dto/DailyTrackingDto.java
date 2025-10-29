package com.hyno.nutrition.dto;

import com.hyno.nutrition.model.MealLog;
import com.hyno.nutrition.model.WaterLog;
import com.hyno.nutrition.model.WeightLog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyTrackingDto {
    private LocalDate date;
    private Integer totalCalories;
    private Integer totalWater;
    private List<MealLog> mealLogs;
    private WaterLog waterLog;
    private WeightLog weightLog;
}
