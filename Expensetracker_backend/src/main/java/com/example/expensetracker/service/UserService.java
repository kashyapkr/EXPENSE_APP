package com.example.expensetracker.service;

import com.example.expensetracker.dto.LoginDto;
import com.example.expensetracker.dto.UserDto;

public interface UserService {
    String registerUser(UserDto userDto);

    String Login(LoginDto loginDto);

//    UserDto getUserById(Long userId);

    Long getTotalBalance();

}
