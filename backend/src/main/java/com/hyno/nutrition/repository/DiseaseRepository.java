package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    List<Disease> findByNameContainingIgnoreCase(String name);

    @Query("SELECT d FROM Disease d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(d.symptoms) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Disease> searchDiseases(@Param("query") String query);
}
