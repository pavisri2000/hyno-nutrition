package com.hyno.nutrition.repository;

import com.hyno.nutrition.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserIdAndRecipeId(Long userId, Long recipeId);

    List<Favorite> findByUserIdOrderByAddedAtDesc(Long userId);

    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);

    @Query("SELECT f FROM Favorite f WHERE f.user.id = :userId AND LOWER(f.recipe.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Favorite> searchUserFavorites(@Param("userId") Long userId, @Param("query") String query);
}
