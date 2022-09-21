package com.ssafy.wayg.controller;

import com.ssafy.wayg.config.auth.LoginUser;
import com.ssafy.wayg.config.auth.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class MainController {
    private final HttpSession httpSession;

    @GetMapping("/")
    public void index(Model model, @LoginUser SessionUser user, HttpServletResponse response) throws IOException {

        if(user != null)
            model.addAttribute("userName", user.getName());

        response.sendRedirect("http://localhost:3000/main");

    }
//    @Autowired
//    private UserDto userDto;
//
//    @GetMapping(path="/", produces="application/json")
//    public Employees getEmployees() {
//        return dao.getAllEmployees();
//    }
}