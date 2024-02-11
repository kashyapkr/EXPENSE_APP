package com.example.expensetracker.exceptions;

import org.modelmapper.internal.bytebuddy.asm.Advice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExecptionHandler {

    @ExceptionHandler(ExpenseApiException.class)
    public ResponseEntity<ErrorDetails> handelExpenseException(ExpenseApiException expenseApiException, WebRequest webRequest){
        ErrorDetails errorDetails = new ErrorDetails(
                expenseApiException.getMessage(),
                webRequest.getDescription(false),
                LocalDateTime.now()

        );
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);

    }

}
