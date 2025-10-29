package com.hyno.nutrition.controller;

import com.hyno.nutrition.model.Favorite;
import com.hyno.nutrition.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private com.hyno.nutrition.service.UserService userService;

    @PostMapping("/{recipeId}")
    public ResponseEntity<Favorite> addToFavorites(@PathVariable Long recipeId, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        Favorite favorite = favoriteService.addToFavorites(userId, recipeId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long recipeId, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        favoriteService.removeFromFavorites(userId, recipeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getUserFavorites(Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<Favorite> favorites = favoriteService.getUserFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Favorite>> searchUserFavorites(@RequestParam String query, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        List<Favorite> favorites = favoriteService.searchUserFavorites(userId, query);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/check/{recipeId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long recipeId, Authentication authentication) {
        String email = authentication.getName();
        Long userId = userService.getUserByEmail(email).getId();
        boolean isFavorite = favoriteService.isFavorite(userId, recipeId);
        return ResponseEntity.ok(isFavorite);
    }
}
