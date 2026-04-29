package com.epam.edp.demo.mapper;

import com.epam.edp.demo.dto.request.SignUpRequestDTO;
import com.epam.edp.demo.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Mapper pattern: converts between DTOs and domain entities,
 * keeping the service layer free of mapping logic.
 */
@Component
public class UserMapper {

    public User toEntity(SignUpRequestDTO dto, PasswordEncoder passwordEncoder) {
        return User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail().toLowerCase())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();
    }
}
