package com.example.myapp.repositories;

import com.example.myapp.models.Hello;
import org.springframework.data.repository.CrudRepository;

public interface HelloRepository
        extends CrudRepository<Hello, Integer> {
}