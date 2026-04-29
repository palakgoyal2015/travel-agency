package com.epam.edp.demo.service;

import com.epam.edp.demo.dto.request.SignUpRequestDTO;
import com.epam.edp.demo.dto.response.SignUpResponseDTO;

public interface AuthService {

    SignUpResponseDTO signUp(SignUpRequestDTO request);
}
