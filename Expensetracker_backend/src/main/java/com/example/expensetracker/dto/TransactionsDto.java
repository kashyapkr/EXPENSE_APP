package com.example.expensetracker.dto;

import com.example.expensetracker.entity.TransactionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionsDto {

    private Long id;
    private String title;
    private String description;
    private String category;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate createdAt;
    private Long amount;
    private TransactionType type;



}
