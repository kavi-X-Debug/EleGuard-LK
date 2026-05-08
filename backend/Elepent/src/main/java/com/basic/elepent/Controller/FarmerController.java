package com.basic.elepent.Controller;


import com.basic.elepent.dto.SensorRespondDTO;
import com.basic.elepent.entity.SensorEntity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/farmer")
public class FarmerController {



//    @GetMapping("/sensorDATA")
//    public ResponseEntity<List<SensorEntity>> sensorDATA(@RequestBody Map<String, String> sectionId) {
//       if (sectionId.get("sectionId") != null) {
//           System.out.println("no data");
//       }
//       List<SensorEntity>  data = sensorRepository.findBySectionId(sectionId.get("sectionId"));
//       if (data == null) {
//           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//       }
//       return new ResponseEntity<>(data, HttpStatus.OK);
//    }
}
