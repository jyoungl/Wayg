package com.ssafy.wayg.controller;

import com.ssafy.wayg.config.auth.LoginUser;
import com.ssafy.wayg.config.auth.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class MainController {
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user){

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