package com.basic.elepent.service;

import com.basic.elepent.dto.LoginReqestDTO;
import com.basic.elepent.dto.LoginRespontDTO;
import com.basic.elepent.dto.RegisterReqestDTO;
import com.basic.elepent.dto.RegisterRespondDTO;
import com.basic.elepent.entity.FarmerEntity;
import com.basic.elepent.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Service
public class AuthService {

    private final JWTservise jwtservise;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JWTservise jwtservise, UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.jwtservise = jwtservise;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    public String getUserNameFromToken(String token) {
        String username= jwtservise.GetUsername(token);
        return  username;
    }




    public LoginRespontDTO createdToken(LoginReqestDTO loginReqestDTO) {
        if(!isExists(loginReqestDTO.getUsername())) {
            new LoginRespontDTO(null,null,true,"user not found",null,null);
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReqestDTO.getUsername(),loginReqestDTO.getPassword()));
        }catch (Exception e){
            new LoginRespontDTO(null,null,true,e.toString(),null,null);
        }

        FarmerEntity farmerEntity =  userRepository.findByUsername(loginReqestDTO.getUsername()).orElse(null);
        if(farmerEntity==null) {
            return new LoginRespontDTO(null,null,true,"farmer not found",null,null);
        }
        Map<String,Object> claims = new HashMap<String,Object>();
        claims.put("roles",farmerEntity.getRole());
        claims.put("emmail",farmerEntity.getId());

        String access_toke= jwtservise.createToken(farmerEntity.getUsername(),claims);

            return new LoginRespontDTO(farmerEntity.getId(),farmerEntity.getFullname(),false,null,access_toke,null);




    }

    Boolean isExists( String username){
        return userRepository.findByUsername(username).isPresent();
    }


    public RegisterRespondDTO RegisterFarmer(RegisterReqestDTO registerReqestDTO) {
        if(userRepository.findByUsername(registerReqestDTO.getUsername()).isPresent()){
            return new RegisterRespondDTO(null, null, "username has been used",false );
        }

        FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), passwordEncoder.encode(registerReqestDTO.getPassword()),
                registerReqestDTO.getEmail(), LocalDateTime.now(),
                registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
                registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
                registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
                registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
                registerReqestDTO.getCrops(), registerReqestDTO.getType(),"USER");


        try {
            FarmerEntity faramer = userRepository.save(farmerEntity);
            if (faramer != null) {
                System.out.println("farmer notfount");
            }
            return new RegisterRespondDTO(faramer.getFullname(), faramer.getId(), "farmer is add",false );
        }
        catch (Exception e) {
            return new RegisterRespondDTO(null, null , e.toString(),true );
        }



    }
}
