package com.hyno.nutrition.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaterLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate date;

    private Integer glasses; // number of 250ml glasses

    private Integer totalMl; // total water in ml

    private LocalDateTime loggedAt = LocalDateTime.now();
}
