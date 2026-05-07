package com.example.demo.Controller;


import com.example.demo.dto.LoginReqestDTO;
import com.example.demo.dto.LoginRespontDTO;
import com.example.demo.dto.RegisterReqestDTO;
import com.example.demo.dto.RegisterRespondDTO;
import com.example.demo.entity.FarmerEntity;
import com.example.demo.service.AuthService;
import com.example.demo.service.JWTservise;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private  final UserService userService;
    private final  AuthService authService;


    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;

        this.authService = authService;
    }


    @GetMapping("/login")
    public  LoginRespontDTO login(@RequestBody LoginReqestDTO loginReqestDTO) {

        FarmerEntity farmer = userService.findFarmerByUsername(loginReqestDTO.getUsername());
        if (farmer == null) {
             return  new LoginRespontDTO(null,null,true,"User not found",null,null);
        }

        return  authService.createdToken(loginReqestDTO);

    }





    @PostMapping("/register")
    public ResponseEntity<RegisterRespondDTO> register(@RequestBody RegisterReqestDTO registerReqestDTO) {
//         FarmerEntity farmerEntity = new FarmerEntity(registerReqestDTO.getUsername(), registerReqestDTO.getPassword(),
//                                        registerReqestDTO.getEmail(), LocalDateTime.now(),
//                 registerReqestDTO.getFullname(), registerReqestDTO.getPhonemumber(),
//                 registerReqestDTO.getLocation(),  registerReqestDTO.getLanguage(),
//                 registerReqestDTO.getProvince(), registerReqestDTO.getDistrict(),
//                 registerReqestDTO.getVillage(), registerReqestDTO.getExactlocation(),
//                 registerReqestDTO.getCrops(), registerReqestDTO.getType(),"USER");
         RegisterRespondDTO respont =   userService.RegisterFarmer(registerReqestDTO);
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

    @GetMapping("/username")
   public  String getUsername(@RequestBody Map<String, String> refreshToken){
         String username=  authService.getUserNameFromToken(refreshToken.get("token"));
         if(username == null){
            return  null;
         }
         return  username;
    }

}
