package com.basic.elepehent_conflict.entity;
;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document( collection =  "Farmer")

@NoArgsConstructor
@Data


public class FarmerEntity {




    private String id;
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



    public FarmerEntity(String username,
                        String password, String email, LocalDateTime createddate, String fullname,
                        String phonemumber, String location, String language, String province, String district,
                        String village, String exactlocation, List<String> crops, String type)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createddate = createddate;
        this.fullname = fullname;
        this.phonemumber = phonemumber;
        this.location = location;
        this.language = language;
        this.province = province;
        this.district = district;
        this.village = village;
        this.exactlocation = exactlocation;
        this.crops = crops;
        this.type = type;
    }
}
