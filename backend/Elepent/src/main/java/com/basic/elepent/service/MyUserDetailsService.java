package com.basic.elepent.service;


import com.basic.elepent.entity.FarmerEntity;
import com.basic.elepent.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FarmerEntity farmer = userRepository.findByUsername(username).orElse(null);
        if (farmer == null) {
            throw new UsernameNotFoundException(username);
        }

        UserDetails user = User.builder()
                .username(farmer.getUsername())
                .password(farmer.getPassword())
                .build();

        return user;
    }
}

