package com.basic.elepent.service;


import com.basic.elepent.dto.SensorRespondDTO;
import com.basic.elepent.repository.SensorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<SensorRespondDTO> sensorData(String sectionId){
        List<SensorRespondDTO> sensorRespondDTOs = sensorRepository.findBySectionId(sectionId);
        return sensorRespondDTOs;
    }
}
