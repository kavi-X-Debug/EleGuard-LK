package com.basic.elepehent_conflict.repository;

import com.basic.elepehent_conflict.entity.FarmerEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<FarmerEntity, String> {
}
