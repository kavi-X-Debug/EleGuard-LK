package com.basic.elepehent_conflict.service;

import com.basic.elepehent_conflict.dto.RegisterRespondDTO;
import com.basic.elepehent_conflict.entity.FarmerEntity;
import com.basic.elepehent_conflict.repository.UserRepository;
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
