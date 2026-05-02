package com.basic.elepehent_conflict.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class RegisterReqestDTO {

    private String username;
    private String password;
    private String email;
    private LocalDateTime createddate;
    private String fullname;
    private String phonemumber;
    private String location;
    private String language;
    private String province;
    private String district;
    private String  village;
    private String exactlocation;
    private List<String> crops;
    private String type;


}
