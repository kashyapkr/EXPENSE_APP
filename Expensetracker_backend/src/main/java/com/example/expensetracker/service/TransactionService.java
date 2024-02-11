package com.example.expensetracker.service;


import com.example.expensetracker.dto.TransactionsDto;
import com.example.expensetracker.entity.TransactionType;

import java.util.List;
import java.util.OptionalLong;

public interface TransactionService {
    TransactionsDto addTransaction(TransactionsDto transactionsDto);
    void deleteTransaction(Long transactionId);

    List<TransactionsDto> getAllIncomes();

    List<TransactionsDto> getAllExpenses();

    List<TransactionsDto> getAllTransactions();

    String updateTransaction(Long Id,TransactionsDto updatedDto);

    List<TransactionsDto> recentlyEntered();

    Long totalIncome();

    Long totalExpense();

    Long MinimumIncome();

    Long MinimumExpense();

    OptionalLong MaximumIncome();

    OptionalLong MaximumExpense();



}
