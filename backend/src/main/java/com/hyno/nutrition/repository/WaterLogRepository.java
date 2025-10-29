package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.WaterLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {

    Optional<WaterLog> findByUserIdAndDate(Long userId, LocalDate date);

    List<WaterLog> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(wl.totalMl) FROM WaterLog wl WHERE wl.user.id = :userId AND wl.date = :date")
    Integer getTotalWaterForDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT wl FROM WaterLog wl WHERE wl.user.id = :userId ORDER BY wl.loggedAt DESC LIMIT 30")
    List<WaterLog> findRecentWaterLogs(@Param("userId") Long userId);
}
