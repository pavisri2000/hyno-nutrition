package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {

    List<MealPlan> findByUserIdOrderByStartDateDesc(Long userId);

    List<MealPlan> findByUserIdAndGoalType(Long userId, String goalType);
}
