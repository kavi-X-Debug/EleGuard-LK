package com.basic.elepent.service;

import com.basic.elepent.entity.FarmerEntity;
import com.basic.elepent.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AdminService {
    private UserRepository userRepository;
    public List<FarmerEntity> findall(){
        List<FarmerEntity> data  = userRepository.findAll();
        return data;
    }
}
