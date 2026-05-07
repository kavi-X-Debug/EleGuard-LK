package com.example.demo.repository;

import com.example.demo.entity.SensorEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SensorRepository  extends MongoRepository<SensorEntity,String> {




}
