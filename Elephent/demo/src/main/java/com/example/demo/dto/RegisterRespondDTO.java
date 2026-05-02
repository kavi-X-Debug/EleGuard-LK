package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRespondDTO {
    private String fullname;
    private String id;
    private String massage;
    private boolean error;

}
