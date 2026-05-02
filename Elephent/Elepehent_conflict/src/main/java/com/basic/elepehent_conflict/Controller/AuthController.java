package com.basic.elepehent_conflict.Controller;


import com.basic.elepehent_conflict.dto.RegisterReqestDTO;
import com.basic.elepehent_conflict.dto.RegisterRespondDTO;
import com.basic.elepehent_conflict.entity.FarmerEntity;
import com.basic.elepehent_conflict.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private  final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @PostMapping("/register")
    public ResponseEntity<RegisterRespondDTO> register(@RequestBody RegisterReqestDTO registerReqestDTO) {
         FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), registerReqestDTO.getPassword(),
                                        registerReqestDTO.getEmail(),LocalDateTime.now(),
                 registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
                 registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
                 registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
                 registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
                 registerReqestDTO.getCrops(), registerReqestDTO.getType());
         RegisterRespondDTO respont =   userService.RegisterFarmer(farmerEntity);
         if(respont == null){ return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
         return new  ResponseEntity<>(respont, HttpStatus.OK);

    }


    @GetMapping("/all")
    public List<FarmerEntity> allFarmers(){
        return userService.findall();
    }

}
