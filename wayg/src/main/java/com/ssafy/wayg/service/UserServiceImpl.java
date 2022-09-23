package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.UserDto;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DEConverter deConverter;

    @Override
    public UserDto register(HashMap<String, Object> userInfo) {
        UserDto userDto = new UserDto();

        userDto.setUserName((String) userInfo.get("nickname"));
        userDto.setUserEmail((String) userInfo.get("email"));
        userDto.setUserAge((String)userInfo.get("age"));
        userDto.setUserGender((String) userInfo.get("gender"));
        userDto.setRole("USER");
        return deConverter.toUserDto(userRepository.save(deConverter.toUserEntity(userDto)));
    }
}
