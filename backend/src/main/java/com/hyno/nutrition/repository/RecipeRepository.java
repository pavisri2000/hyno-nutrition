package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findByMealType(String mealType, Pageable pageable);

    Page<Recipe> findByCuisineType(String cuisineType, Pageable pageable);

    Page<Recipe> findByIsVegetarian(Boolean isVegetarian, Pageable pageable);

    List<Recipe> findByDiseaseId(Long diseaseId);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.ingredients) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Recipe> searchRecipes(@Param("query") String query, Pageable pageable);

    @Query("SELECT r FROM Recipe r WHERE r.calories <= :maxCalories")
    List<Recipe> findByMaxCalories(@Param("maxCalories") Integer maxCalories);

    List<Recipe> findByMealTypeAndCaloriesLessThanEqual(String mealType, Integer calories);
}
