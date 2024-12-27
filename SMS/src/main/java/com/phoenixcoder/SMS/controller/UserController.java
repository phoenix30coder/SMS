package com.phoenixcoder.SMS.controller;

import com.phoenixcoder.SMS.model.User;
import com.phoenixcoder.SMS.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.register(user);

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticateUser(user.getUsername(), user.getPassword());
        return isAuthenticated ? ResponseEntity.ok("Login successful!") : ResponseEntity.badRequest().body("Invalid credentials.");
    }
}
