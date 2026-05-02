package com.example.demo.service;


import com.example.demo.dto.RegisterRespondDTO;
import com.example.demo.entity.FarmerEntity;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public RegisterRespondDTO RegisterFarmer(FarmerEntity farmerEntity) {

        try {
           FarmerEntity faramer = userRepository.save(farmerEntity);
            return new RegisterRespondDTO(faramer.getFullname(), faramer.getId(), "farmer is add",false );
        }
        catch (Exception e) {
            return new RegisterRespondDTO(null, "null ", e.toString(),true );
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
