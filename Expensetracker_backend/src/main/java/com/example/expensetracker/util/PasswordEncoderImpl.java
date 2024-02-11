package com.example.expensetracker.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderImpl {
    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String user = passwordEncoder.encode("kkr");
        String admin  = passwordEncoder.encode("admin");
        System.out.println(user);
        System.out.println(admin);
        System.out.println( passwordEncoder.encode("user"));
        System.out.println( passwordEncoder.encode("shilpa"));

    }
}
