package com.example.expensetracker.repository;


import com.example.expensetracker.entity.TransactionType;
import com.example.expensetracker.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.OptionalLong;

@Repository
public interface TransactionRepo extends JpaRepository<Transactions,Long> {

    List<Transactions> findByUserUsernameAndType(String username, TransactionType transactionType);
    Boolean existsByIdAndUserUsername(Long incomeId, String username);
    List<Transactions> findTop3ByUserUsernameOrderByCreatedAtDesc(String username);

    List<Transactions> findByUserUsername(String username);

    @Query("SELECT MIN(t.amount) FROM Transactions t WHERE t.user.username = :username AND t.type = 'INCOME'")
    Long findMinimumIncomeAmount(@Param("username") String username);


    @Query("SELECT MIN(t.amount) FROM Transactions t WHERE t.user.username = :username AND t.type = 'EXPENSE'")
    Long findMinimumExpenseAmount(@Param("username") String username);





}
