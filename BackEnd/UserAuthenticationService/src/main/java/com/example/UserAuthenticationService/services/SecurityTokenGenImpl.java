package com.example.UserAuthenticationService.services;

import com.example.UserAuthenticationService.domain.Customer;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGenImpl implements SecurityTokenGenerator{

    @Override
    public String createToken(Customer customer){
        // Write logic to create the Jwt
        Map<String, Object> claims=new HashMap<>();
        claims.put("id",customer.getCustomerId());
        return generateToken(claims,customer.getCustomerId());
    }

    public String generateToken(Map<String,Object> claims,String subject) {
        String jwtToken= Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"secretKey").compact();
        return jwtToken;
    }
}
