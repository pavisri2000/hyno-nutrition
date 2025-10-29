package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, Long> {

    List<MealLog> findByUserIdAndDate(Long userId, LocalDate date);

    List<MealLog> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(ml.caloriesConsumed) FROM MealLog ml WHERE ml.user.id = :userId AND ml.date = :date")
    Integer getTotalCaloriesForDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT ml FROM MealLog ml WHERE ml.user.id = :userId ORDER BY ml.loggedAt DESC")
    List<MealLog> findRecentMealLogs(@Param("userId") Long userId);
}
