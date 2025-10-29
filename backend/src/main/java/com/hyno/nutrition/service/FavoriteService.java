package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.ResourceNotFoundException;
import com.hyno.nutrition.model.Favorite;
import com.hyno.nutrition.model.Recipe;
import com.hyno.nutrition.model.User;
import com.hyno.nutrition.repository.FavoriteRepository;
import com.hyno.nutrition.repository.RecipeRepository;
import com.hyno.nutrition.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Favorite addToFavorites(Long userId, Long recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

        if (favoriteRepository.existsByUserIdAndRecipeId(userId, recipeId)) {
            throw new IllegalArgumentException("Recipe already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favorite.setUserRecipeKey(userId + "_" + recipeId);

        return favoriteRepository.save(favorite);
    }

    public void removeFromFavorites(Long userId, Long recipeId) {
        Optional<Favorite> favorite = favoriteRepository.findByUserIdAndRecipeId(userId, recipeId);
        if (favorite.isPresent()) {
            favoriteRepository.delete(favorite.get());
        } else {
            throw new ResourceNotFoundException("Favorite not found");
        }
    }

    public List<Favorite> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserIdOrderByAddedAtDesc(userId);
    }

    public List<Favorite> searchUserFavorites(Long userId, String query) {
        return favoriteRepository.searchUserFavorites(userId, query);
    }

    public boolean isFavorite(Long userId, Long recipeId) {
        return favoriteRepository.existsByUserIdAndRecipeId(userId, recipeId);
    }
}
