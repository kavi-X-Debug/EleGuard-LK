package com.example.demo.service;


import com.example.demo.dto.RegisterReqestDTO;
import com.example.demo.dto.RegisterRespondDTO;
import com.example.demo.entity.FarmerEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }






    public RegisterRespondDTO RegisterFarmer(RegisterReqestDTO registerReqestDTO) {

                 FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), passwordEncoder.encode(registerReqestDTO.getPassword()),
                                        registerReqestDTO.getEmail(), LocalDateTime.now(),
                 registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
                 registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
                 registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
                 registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
                 registerReqestDTO.getCrops(), registerReqestDTO.getType(),"USER");


        try {
           FarmerEntity faramer = userRepository.save(farmerEntity);
            return new RegisterRespondDTO(faramer.getFullname(), faramer.getId(), "farmer is add",false );
        }
        catch (Exception e) {
            return new RegisterRespondDTO(null, null , e.toString(),true );
        }



    }


    public List<FarmerEntity> findall(){
        List<FarmerEntity> data  = userRepository.findAll();
        return data;
    }

    public  FarmerEntity findFarmerByUsername(String username) {
        FarmerEntity farmer = userRepository.findByUsername(username).orElse(null);
        return farmer;
    }



}
