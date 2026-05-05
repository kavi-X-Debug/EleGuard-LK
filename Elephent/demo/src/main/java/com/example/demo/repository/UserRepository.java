package com.example.demo.repository;


import com.example.demo.entity.FarmerEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<FarmerEntity, String> {
    Optional<FarmerEntity> findByUsername(String username);
}
