package com.example.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String name;
    private String username;
    private String email;
    private String password;
    private Long acc_balance;


}
