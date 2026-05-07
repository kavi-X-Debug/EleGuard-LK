package com.example.demo.Controller;


import com.example.demo.dto.LoginReqestDTO;
import com.example.demo.dto.LoginRespontDTO;
import com.example.demo.dto.RegisterReqestDTO;
import com.example.demo.dto.RegisterRespondDTO;
import com.example.demo.entity.FarmerEntity;
<<<<<<< HEAD
import com.example.demo.service.AuthService;
import com.example.demo.service.JWTservise;
=======
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
<<<<<<< HEAD
import java.util.Map;
=======
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private  final UserService userService;
<<<<<<< HEAD
    private final  AuthService authService;


    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;

        this.authService = authService;
=======

    public AuthController(UserService userService) {
        this.userService = userService;
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544
    }


    @GetMapping("/login")
    public  LoginRespontDTO login(@RequestBody LoginReqestDTO loginReqestDTO) {

<<<<<<< HEAD
        FarmerEntity farmer = userService.findFarmerByUsername(loginReqestDTO.getUsername());
        if (farmer == null) {
             return  new LoginRespontDTO(null,null,true,"User not found",null,null);
        }

        return  authService.createdToken(loginReqestDTO);
=======
        FarmerEntity farmer = userService.findFarmerByUsername("ravindu123");
        if (farmer == null) {
             return  new LoginRespontDTO(null,null,true,"User not found");
        }
        return  new LoginRespontDTO(null,null, false,"Login successful");
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544

    }





    @PostMapping("/register")
    public ResponseEntity<RegisterRespondDTO> register(@RequestBody RegisterReqestDTO registerReqestDTO) {
<<<<<<< HEAD
//         FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), registerReqestDTO.getPassword(),
//                                        registerReqestDTO.getEmail(), LocalDateTime.now(),
//                 registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
//                 registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
//                 registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
//                 registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
//                 registerReqestDTO.getCrops(), registerReqestDTO.getType(),"USER");
         RegisterRespondDTO respont =   userService.RegisterFarmer(registerReqestDTO);
=======
         FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), registerReqestDTO.getPassword(),
                                        registerReqestDTO.getEmail(), LocalDateTime.now(),
                 registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
                 registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
                 registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
                 registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
                 registerReqestDTO.getCrops(), registerReqestDTO.getType());
         RegisterRespondDTO respont =   userService.RegisterFarmer(farmerEntity);
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544
         if(respont == null){
             return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
         }
         return new ResponseEntity<>(respont, HttpStatus.OK);

    }





    @GetMapping("/all")
    public ResponseEntity<List<FarmerEntity>> getAlLfarmer() {
        List<FarmerEntity> data = userService.findall();
        if(data == null){ return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

<<<<<<< HEAD
    @GetMapping("/username")
   public  String getUsername(@RequestBody Map<String, String> refreshToken){
         String username=  authService.getUserNameFromToken(refreshToken.get("token"));
         if(username == null){
            return  null;
         }
         return  username;
    }

=======
>>>>>>> f822b29e4e638e7a1c58a29e8dd125823f7d5544
}
