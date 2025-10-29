package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeightLogRepository extends JpaRepository<WeightLog, Long> {

    Optional<WeightLog> findByUserIdAndDate(Long userId, LocalDate date);

    List<WeightLog> findByUserIdAndDateBetweenOrderByDate(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT wl FROM WeightLog wl WHERE wl.user.id = :userId ORDER BY wl.date DESC LIMIT 30")
    List<WeightLog> findRecentWeightLogs(@Param("userId") Long userId);

    @Query("SELECT wl FROM WeightLog wl WHERE wl.user.id = :userId ORDER BY wl.date ASC")
    List<WeightLog> findAllByUserIdOrderByDateAsc(@Param("userId") Long userId);
}
