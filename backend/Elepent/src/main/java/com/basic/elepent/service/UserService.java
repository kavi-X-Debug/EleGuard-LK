package com.basic.elepent.service;


import com.basic.elepent.dto.RegisterReqestDTO;
import com.basic.elepent.dto.RegisterRespondDTO;
import com.basic.elepent.entity.FarmerEntity;
import com.basic.elepent.repository.UserRepository;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;



    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

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
