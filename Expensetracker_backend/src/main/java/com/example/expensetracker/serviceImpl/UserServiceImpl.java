package com.example.expensetracker.serviceImpl;

import com.example.expensetracker.dto.LoginDto;
import com.example.expensetracker.dto.UserDto;
import com.example.expensetracker.entity.Role;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.exceptions.ExpenseApiException;
import com.example.expensetracker.exceptions.UnauthorizedException;
import com.example.expensetracker.exceptions.UserNotFoundException;
import com.example.expensetracker.repository.RoleRepository;
import com.example.expensetracker.repository.UserRepo;
import com.example.expensetracker.service.UserService;
import com.example.expensetracker.util.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private ModelMapper modelMapper;
    private UserRepo userRepo;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;


    public String registerUser(UserDto userDto) {
        if(userRepo.existsByUsername(userDto.getUsername())){
            throw new ExpenseApiException(HttpStatus.BAD_REQUEST,"User already exists");
        }
        if(userRepo.existsByEmail(userDto.getEmail())){
            throw new ExpenseApiException(HttpStatus.BAD_REQUEST,"User with this email already exists");
        }
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Set<Role> roles= new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepo.save(user);
        return "User Registered Successfully";
    }

    @Override
    public String Login(LoginDto loginDto) {

        try{
            Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(),loginDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);
            return token;

        }
        catch (BadCredentialsException e) {
            // Invalid username or password
           throw new UnauthorizedException("Invalid username or password");
        } catch (UsernameNotFoundException e) {
            // User not found
            throw new UnauthorizedException("User not found");
        } catch (Exception e) {
            // Other exceptions
            throw new UnauthorizedException("Authentication failed");
        }


    }

    @Override
    public Long getTotalBalance() {
        String username  = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow(()->new UserNotFoundException("User not found"));
        return user.getAcc_balance();

    }


}
