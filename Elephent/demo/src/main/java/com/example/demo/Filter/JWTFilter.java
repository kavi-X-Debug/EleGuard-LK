package com.example.demo.Filter;


import com.example.demo.entity.FarmerEntity;
import com.example.demo.service.JWTservise;
import com.example.demo.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;



@Component
public class JWTFilter  extends OncePerRequestFilter {

    private  final JWTservise jwtservise;
    private final UserService   userService;

    public JWTFilter(JWTservise jwtservise, UserService userService) {
        this.jwtservise = jwtservise;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization   = request.getHeader("Authorization");

        if(authorization == null){
            filterChain.doFilter(request,response);
            return;
        }
        if(!authorization.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
        }

        String token = authorization.split("Bearer ")[1];
        if(token == null){
            filterChain.doFilter(request,response);
            return;
        }
        String username = jwtservise.GetUsername(token);
        if(username == null){
            filterChain.doFilter(request,response);
            return;
        }
        System.out.println("token has been recived");

        if(SecurityContextHolder.getContext().getAuthentication() != null){
            filterChain.doFilter(request,response);
            return;
        }

        FarmerEntity farmer =  userService.findFarmerByUsername(username);

        UserDetails user = User.builder()
                .username(farmer.getFullname())
                .password(farmer.getPassword())
                .build();


        UsernamePasswordAuthenticationToken newtoken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newtoken);
        filterChain.doFilter(request,response);
    }
}
