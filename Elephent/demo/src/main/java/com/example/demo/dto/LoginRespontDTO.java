package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRespontDTO {

  private  String  id;
  private String  name;
  private  boolean  error;

    public LoginRespontDTO(String id, String name, boolean error, String massge) {
        this.id = id;
        this.name = name;
        this.error = error;
        this.massge = massge;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getMassge() {
        return massge;
    }

    public void setMassge(String massge) {
        this.massge = massge;
    }

    private  String massge;


}
