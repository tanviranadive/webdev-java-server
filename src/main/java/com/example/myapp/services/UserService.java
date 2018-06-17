package com.example.myapp.services;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.myapp.models.User;
import com.example.myapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
public class UserService {
    @Autowired
    UserRepository repository;

    @GetMapping("/api/user")
    public List<User> findAllUsers() {
        return (List<User>) repository.findAll();
    }

    @PostMapping("/api/user")
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }

    @DeleteMapping("/api/user/{userId}")
    public void deleteUser(@PathVariable("userId") int id) {
        repository.deleteById(id);
    }

    @PostMapping("/api/login")
    public User login(@RequestBody User user, HttpServletResponse response) {
        System.out.println("in server service");
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        Optional<User> data = repository.findUserByCredentials(user.getUsername(), user.getPassword());
        System.out.println(data.get().getUsername());
        if(data.isPresent()) {
            return data.get();
        }
        response.setStatus(HttpServletResponse.SC_CONFLICT);
        return null;
    }

    @GetMapping("/api/user/{userId}")
    public User findUserById(@PathVariable("userId") int userId) {
        System.out.println(userId);
        Optional<User> data = repository.findById(userId);
        System.out.println(data.get().getUsername());
        if(data.isPresent()) {
            return data.get();
        }
        return null;
    }

    @PutMapping("/api/user/{userId}")
    public User updateUser(@PathVariable("userId") int userId, @RequestBody User newUser, HttpServletResponse response) {
        Optional<User> data = repository.findById(userId);
        System.out.println(data);
        if(data.isPresent()) {
            User user = data.get();
            user.setUsername(newUser.getUsername());
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setRole(newUser.getRole());
            repository.save(user);
            return user;
        }
        response.setStatus(HttpServletResponse.SC_CONFLICT);
        return null;
    }

    @PutMapping("/api/profile")
    public User updateProfile(@RequestBody User newUser, HttpServletResponse response) {
        Optional<User> data = repository.findById(newUser.getId());
        if(data.isPresent()) {
            User user = data.get();
            user.setUsername(newUser.getUsername());
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setRole(newUser.getRole());
            user.setEmail(newUser.getEmail());
            user.setPhone(newUser.getPhone());
            user.setDob(newUser.getDob());
            repository.save(user);
            return user;
        }
        response.setStatus(HttpServletResponse.SC_CONFLICT);
        return null;
    }

    @PostMapping("/api/register")
    public User findUserByUsername(@RequestBody User user, HttpServletResponse response) {
        System.out.println("register server service");
        System.out.println(user.getUsername());
        Optional<User> data = repository.findUserByUsername(user.getUsername());
        if(data.isPresent()) {
            return data.get();
        }
        response.setStatus(HttpServletResponse.SC_CONFLICT);
        return null;
    }

}
