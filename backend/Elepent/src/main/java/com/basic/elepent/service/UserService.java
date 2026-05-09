package com.basic.elepent.service;


import com.basic.elepent.dto.*;
import com.basic.elepent.entity.FarmerEntity;
import com.basic.elepent.entity.SensorEnrollmentEntity;
import com.basic.elepent.entity.SensorEntity;
import com.basic.elepent.repository.SensorEnrollmentRepository;
import com.basic.elepent.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SensorEnrollmentRepository sensorEnrollmentRepository;



    public UserService(UserRepository userRepository, SensorEnrollmentRepository sensorEnrollmentRepository) {
        this.userRepository = userRepository;

        this.sensorEnrollmentRepository = sensorEnrollmentRepository;
    }





    public  FarmerEntity findFarmerByUsername(String username) {
        FarmerEntity farmer = userRepository.findByUsername(username).orElse(null);
        return farmer;
    }





    public SensorEnrollmentRespondDTO sensorEnrollment(SensorEnrollmentReqestDTO data){
        FarmerEntity farmer= userRepository.findByUsername(data.getFarmername()).orElse(null);
        if(isExist(data.getSectionId(), data.getFarmername())){ return  new SensorEnrollmentRespondDTO(null,"data  is already add",true,false);}
        if(farmer==null){
            return  new SensorEnrollmentRespondDTO(null,"farmer not found",true,false);
        }
        SensorEnrollmentEntity sensor =  new SensorEnrollmentEntity( data.getFarmername(), data.getSectionId(), data.getWater_canal_present(), data.getForest_distance_m(), Instant.now(),true, data.getGPS_Location());
        SensorEnrollmentEntity respond =  sensorEnrollmentRepository.save(sensor);
        return  new SensorEnrollmentRespondDTO(respond.getId(),"success",false,true);
    }


        public  Boolean isExist(String sectionId,String farmername){
                return sensorEnrollmentRepository.findByFarmernameAndSectionId(farmername,sectionId).isPresent();
        }


}
