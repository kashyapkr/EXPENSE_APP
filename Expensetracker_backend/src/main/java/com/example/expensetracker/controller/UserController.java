package com.example.expensetracker.controller;

import com.example.expensetracker.dto.JwtAuthResponse;
import com.example.expensetracker.dto.LoginDto;
import com.example.expensetracker.dto.UserDto;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.exceptions.UnauthorizedException;
import com.example.expensetracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("api/user")
public class UserController {
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody UserDto userDto){
        String response  = userService.registerUser(userDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody LoginDto loginDto){
       try{
           String token = userService.Login(loginDto);
           JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
           jwtAuthResponse.setAccessToken(token);
           return new ResponseEntity<>(jwtAuthResponse,HttpStatus.OK);

        }
       catch(UnauthorizedException e){
           JwtAuthResponse response  = new JwtAuthResponse();
           response.setErrorMessage(e.getMessage());
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
       }

    }

    @GetMapping("/balance")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Long> getAccBalance(){
        Long balance = userService.getTotalBalance();
        return new ResponseEntity<>(balance,HttpStatus.OK);
    }
}
