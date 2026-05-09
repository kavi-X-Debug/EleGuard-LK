package com.basic.elepent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
;

import java.time.LocalDateTime;


@AllArgsConstructor
@Data
public class UserDTO {
    private String username;
    private String password;
    private String email;
    private LocalDateTime createddate;
    private String fullname;
    private String phonemumber;
    private String location;
}
