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
            return new RegisterRespondDTO(faramer.getFullname(), faramer.getId(), null,false );
        }
        catch (Exception e) {
            return new RegisterRespondDTO("new ", "new id ", e.toString(),true );
        }



    }


    public List<FarmerEntity> findall(){
        List<FarmerEntity> data  = userRepository.findAll();
        return data;
    }

}
