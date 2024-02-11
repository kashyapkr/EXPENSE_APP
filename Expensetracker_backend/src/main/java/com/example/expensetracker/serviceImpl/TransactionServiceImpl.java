package com.example.expensetracker.serviceImpl;

import com.example.expensetracker.dto.TransactionsDto;
import com.example.expensetracker.entity.TransactionType;
import com.example.expensetracker.entity.Transactions;
import com.example.expensetracker.exceptions.UserNotFoundException;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.TransactionRepo;
import com.example.expensetracker.repository.UserRepo;
import com.example.expensetracker.service.TransactionService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.OptionalLong;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private TransactionRepo transactionRepo;
    private UserRepo userRepo;
    private ModelMapper modelMapper;



    @Override
    public TransactionsDto addTransaction(TransactionsDto transactionsDto) {
        String username  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow(()->new UserNotFoundException("User not found"));
        Long curr_balance = user.getAcc_balance();
//        System.out.println(username);
        System.out.println("Type" + transactionsDto.getType());
        if(transactionsDto.getType() == TransactionType.INCOME){
            curr_balance += transactionsDto.getAmount();
            System.out.println("this is executed");

        }else{
            curr_balance -= transactionsDto.getAmount();
        }
        user.setAcc_balance(curr_balance);
        Transactions transactions = modelMapper.map(transactionsDto, Transactions.class);
        transactions.setCreatedAt(transactionsDto.getCreatedAt());
        transactions.setType(transactionsDto.getType());
        transactions.setUser(user);
        return modelMapper.map(transactionRepo.save(transactions), TransactionsDto.class);
    }


    @Override
    public void deleteTransaction(Long transactionId) {
        System.out.println(transactionId);
        String username  = SecurityContextHolder.getContext().getAuthentication().getName();
        if(transactionRepo.existsByIdAndUserUsername(transactionId,username)){
            transactionRepo.deleteById(transactionId);
        }else{
            throw  new UserNotFoundException("User or Income data not found");
        }
    }

    @Override
    public List<TransactionsDto> getAllIncomes() {
        try{
            String username  = SecurityContextHolder.getContext().getAuthentication().getName();
//            System.out.println(username);
            List<Transactions> transactionsList = transactionRepo.findByUserUsernameAndType(username,TransactionType.INCOME);
            return transactionsList.stream().map((t)->modelMapper.map(t,TransactionsDto.class)).collect(Collectors.toList());

        }catch (Exception e){
            System.out.println(e);
            throw new UserNotFoundException("User not found");
        }

    }

    @Override
    public List<TransactionsDto> getAllExpenses() {
        try{
            String username  = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println("Expneses calling");
            List<Transactions> transactionsList = transactionRepo.findByUserUsernameAndType(username,TransactionType.EXPENSE);
            return transactionsList.stream().map((t)->modelMapper.map(t,TransactionsDto.class)).collect(Collectors.toList());

        }catch (Exception e){
            System.out.println(e);
            throw new UserNotFoundException("User not found");
        }

    }

    @Override
    public List<TransactionsDto> getAllTransactions() {
        try{
            String username  = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println(username);
            List<Transactions> transactionsList = transactionRepo.findByUserUsername(username);
            return transactionsList.stream().map((t)->modelMapper.map(t,TransactionsDto.class)).collect(Collectors.toList());

        }catch (Exception e){
            System.out.println(e);
            throw new UserNotFoundException("User not found");
        }
    }

    @Override
    public String updateTransaction(Long id, TransactionsDto updatedDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if(transactionRepo.existsByIdAndUserUsername(id,username)){
            Transactions transactions = transactionRepo.findById(id).orElseThrow(()->new RuntimeException("Transaction not found"));
            transactions.setTitle(updatedDto.getTitle());
            transactions.setDescription(updatedDto.getDescription());
            transactions.setCategory(updatedDto.getCategory());
            transactions.setAmount(updatedDto.getAmount());
            transactions.setCreatedAt(updatedDto.getCreatedAt());
            transactions.setType(updatedDto.getType());
            transactionRepo.save(transactions);
            return "Income updated successfully";

        }
        else{
            throw new UserNotFoundException("Not updated");
        }


    }

    @Override
    public List<TransactionsDto> recentlyEntered() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Transactions> recentTransactions = transactionRepo.findTop3ByUserUsernameOrderByCreatedAtDesc(username);
        return recentTransactions.stream().map(t->modelMapper.map(t,TransactionsDto.class)).collect(Collectors.toList());
    }

    @Override
    public Long totalIncome() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Transactions> userIncomeTransactions = transactionRepo.findByUserUsernameAndType(username,TransactionType.INCOME);
        return userIncomeTransactions.stream().mapToLong(Transactions::getAmount).sum();
    }

    @Override
    public Long totalExpense() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Transactions> userIncomeTransactions = transactionRepo.findByUserUsernameAndType(username,TransactionType.EXPENSE);
        return userIncomeTransactions.stream().mapToLong(Transactions::getAmount).sum();
    }

    @Override
    public Long MinimumIncome() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return transactionRepo.findMinimumIncomeAmount(username);
    }

    @Override
    public Long MinimumExpense() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return transactionRepo.findMinimumExpenseAmount(username);
    }

    @Override
    public OptionalLong MaximumIncome() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Transactions> maxIncome = transactionRepo.findByUserUsernameAndType(username,TransactionType.INCOME);
        return maxIncome.stream().mapToLong(Transactions::getAmount).max();
    }

    @Override
    public OptionalLong MaximumExpense() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Transactions> maxExpense = transactionRepo.findByUserUsernameAndType(username,TransactionType.EXPENSE);
        return maxExpense.stream().mapToLong(Transactions::getAmount).max();
    }


}
