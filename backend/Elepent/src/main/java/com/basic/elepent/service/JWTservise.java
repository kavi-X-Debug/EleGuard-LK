package com.basic.elepent.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTservise {

    private  final SecretKey secretKey;


    public JWTservise() {
        try{
            SecretKey k = KeyGenerator.getInstance("HmacSHA256").generateKey();
            this.secretKey = Keys.hmacShaKeyFor(k.getEncoded());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    public String createToken(String username){
        return Jwts.builder()
                .claim("username",username)
                .subject("ravindu123")
                .issuedAt( new Date(System.currentTimeMillis()))
                .expiration( new Date(System.currentTimeMillis()+3600 * 1000))
                .signWith(secretKey)
                .compact();
    }


    public String GetUsername(String token){
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


}
