package com.ssafy.wayg.controller;

import com.ssafy.wayg.auth.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wayg.dto.UserDto;
import com.ssafy.wayg.entity.User;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {
    private final HttpSession httpSession;

    public String index(Model model){
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        if(user != null)
            model.addAttribute("userName", user.getName());

        return "index";
    }
//    @Autowired
//    private UserDto userDto;
//
//    @GetMapping(path="/", produces="application/json")
//    public Employees getEmployees() {
//        return dao.getAllEmployees();
//    }
}