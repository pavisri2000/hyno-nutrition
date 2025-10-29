package com.hyno.nutrition.controller;

import com.hyno.nutrition.dto.UserDto;
import com.hyno.nutrition.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        String email = authentication.getName();
        UserDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@Valid @RequestBody UserDto userDto, Authentication authentication) {
        String email = authentication.getName();
        UserDto updatedUser = userService.updateUser(email, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(Authentication authentication) {
        String email = authentication.getName();
        userService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }
}
