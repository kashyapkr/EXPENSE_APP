package com.example.expensetracker.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ExpenseApiException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
