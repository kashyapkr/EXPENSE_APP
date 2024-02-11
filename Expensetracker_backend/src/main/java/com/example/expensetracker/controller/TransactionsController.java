package com.example.expensetracker.controller;

import com.example.expensetracker.dto.TransactionsDto;
import com.example.expensetracker.entity.TransactionType;
import com.example.expensetracker.repository.UserRepo;
import com.example.expensetracker.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.OptionalLong;

@RestController
@AllArgsConstructor
@RequestMapping("api/transaction")
@CrossOrigin("*")
public class TransactionsController {

    private TransactionService transactionService;


    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<TransactionsDto> addTransaction(@RequestBody TransactionsDto transactionsDto){
        TransactionsDto newTransactionDto  = transactionService.addTransaction(transactionsDto);
        return new ResponseEntity<>(newTransactionDto, HttpStatus.CREATED);
    }

    @GetMapping("/incomes")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<TransactionsDto>> getIncomes(){
        List<TransactionsDto> transactionsDtos = transactionService.getAllIncomes();
        return new ResponseEntity<>(transactionsDtos,HttpStatus.OK);

    }
    @GetMapping("/expenses")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<TransactionsDto>> getExpenses(){
        List<TransactionsDto> transactionsDtos = transactionService.getAllExpenses();
        return new ResponseEntity<>(transactionsDtos,HttpStatus.OK);

    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<TransactionsDto>> getAll(){
        List<TransactionsDto> transactionsDtos = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactionsDtos,HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id){
       transactionService.deleteTransaction(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<String> updateTransaction(@PathVariable Long id,@RequestBody TransactionsDto transactionDto){
        String response = transactionService.updateTransaction(id,transactionDto);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/recent")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<TransactionsDto>> getRecentTransactions(){
        List<TransactionsDto> transactionsDtos = transactionService.recentlyEntered();
        return ResponseEntity.ok(transactionsDtos);
    }

    @GetMapping("/income")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Long> getTotalIncome(){
        return ResponseEntity.ok(transactionService.totalIncome());
    }

    @GetMapping("/expense")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Long> getTotalExpense(){
        return ResponseEntity.ok(transactionService.totalExpense());
    }

    @GetMapping("/income-min")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Long> getMinIncome(){
        return ResponseEntity.ok(transactionService.MinimumIncome());
    }

    @GetMapping("/expense-min")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Long> getMinExpense(){
        return ResponseEntity.ok(transactionService.MinimumExpense());
    }

    @GetMapping("/expense-max")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<OptionalLong> getMaxExpense(){
        return ResponseEntity.ok(transactionService.MaximumExpense());
    }

    @GetMapping("/income-max")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<OptionalLong> getMaxIncome(){
        return ResponseEntity.ok(transactionService.MaximumIncome());
    }



}
