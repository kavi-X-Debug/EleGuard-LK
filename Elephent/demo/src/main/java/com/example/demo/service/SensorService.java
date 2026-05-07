package com.example.demo.service;

import com.example.demo.dto.SensorDTO;
import com.example.demo.dto.SensorResponseDTO;
import com.example.demo.entity.SensorEntity;
import com.example.demo.repository.SensorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service

public class SensorService {
    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public SensorResponseDTO saveSensorData(SensorDTO sensorDTO){


        SensorEntity sensordata=new SensorEntity(sensorDTO.getSeason(),
                sensorDTO.getMoon_phase(),
                sensorDTO.getCrop_type(), sensorDTO.getCrop_maturity_stage(),sensorDTO.getHour_of_day(),sensorDTO.getNight(),sensorDTO.getTemperature_c(),sensorDTO.getL_last_24h_mm(),sensorDTO.getDays_to_harvest(),sensorDTO.getWater_canal_present(),sensorDTO.getForest_distance_m(),sensorDTO.getRiggered_last_1hr(),sensorDTO.getTriggered_last_6hrs(),sensorDTO.isS_last_7days(),sensorDTO.isEction_triggered_yesterday(),sensorDTO.getClosest_detection_last_24h_m(),sensorDTO.get_risk_score_last_week(),sensorDTO.getNeighbor_max_risk_score(),sensorDTO.isNeighbor_any_triggered_1hr(),sensorDTO.getInutes_since_last_trigger(),sensorDTO.getEcay_factor(),sensorDTO.getAmplitude(),sensorDTO.isCrossedBoundary(),sensorDTO.isFalseAlarm(),sensorDTO.isActive(),sensorDTO.getSensorId(),sensorDTO.getSeverity(),
                sensorDTO.getThreatRadius(),sensorDTO.getTimestamp(),sensorDTO.getSensorId());


      SensorEntity respond=  sensorRepository.save(sensordata);


            return  new SensorResponseDTO(null,false,null,respond.getID());






    }


}
