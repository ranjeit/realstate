package com.realestate.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HellController {

    @GetMapping("/hello")
    public String hello(){
        return "welcome to Real state platform!";
    }

}
