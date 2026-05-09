package com.basic.elepent.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;



@Data
public class AdminEntity extends UserEntitiy {
    private String adminId;

    public AdminEntity( String username, String password, String email, LocalDateTime createddate, String fullname, String phonemumber, String location, String adminId) {
        super( username, password, email, createddate, fullname, phonemumber, location);
        this.adminId = adminId;
    }
}
