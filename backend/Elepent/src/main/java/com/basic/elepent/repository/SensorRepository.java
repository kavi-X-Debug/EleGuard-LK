package com.basic.elepent.repository;

import com.basic.elepent.dto.SensorRespondDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SensorRepository extends MongoRepository<SensorRepository, String> {
    List<SensorRespondDTO> findBySectionId( String sectionId);
}
