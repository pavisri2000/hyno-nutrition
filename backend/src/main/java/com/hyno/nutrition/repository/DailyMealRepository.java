package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.DailyMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyMealRepository extends JpaRepository<DailyMeal, Long> {

    List<DailyMeal> findByMealPlanIdOrderByDay(Long mealPlanId);
}
