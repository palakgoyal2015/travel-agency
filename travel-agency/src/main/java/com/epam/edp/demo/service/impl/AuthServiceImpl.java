package com.epam.edp.demo.service.impl;

import com.epam.edp.demo.dto.request.SignUpRequestDTO;
import com.epam.edp.demo.dto.response.SignUpResponseDTO;
import com.epam.edp.demo.entity.User;
import com.epam.edp.demo.exception.EmailAlreadyExistsException;
import com.epam.edp.demo.mapper.UserMapper;
import com.epam.edp.demo.repository.UserRepository;
import com.epam.edp.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public SignUpResponseDTO signUp(SignUpRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        User user = userMapper.toEntity(request, passwordEncoder);
        userRepository.save(user);

        return new SignUpResponseDTO("Account created successfully");
    }
}
