package com.phoenixcoder.SMS.service;

import com.phoenixcoder.SMS.model.User;
import com.phoenixcoder.SMS.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public ResponseEntity<?> register(User user) {
//        user.setPassword(encoder.encode(user.getPassword()));
        if(userRepo.existsByUsername(user.getUsername())){
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setPassword(user.getPassword());
        userRepo.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    public boolean authenticateUser(String username, String password) {
        User user = userRepo.findByUsername(username);
        return user != null && password.equals(user.getPassword());
    }
}