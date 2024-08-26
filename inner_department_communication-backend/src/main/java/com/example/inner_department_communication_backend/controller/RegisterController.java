package com.example.inner_department_communication_backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.inner_department_communication_backend.DTO.LoginRequestDTO;
import com.example.inner_department_communication_backend.model.Register;
import com.example.inner_department_communication_backend.service.RegisterService;

@RestController
@CrossOrigin("*")
public class RegisterController {
      @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Register register) {
        boolean isRegistered = registerService.registerUser(register);

        if (isRegistered) {
            return ResponseEntity.ok("Registration successful!");
        } else {
            return ResponseEntity.status(400).body("Registration failed.");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        String departmentName = registerService.loginAndGetDepartmentName(loginRequest.getEmail(), loginRequest.getPassword());
        if (departmentName != null) {
            return ResponseEntity.ok("Login successful. Department: " + departmentName);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }


     @GetMapping("/departments-name/{departmentName}")
    public ResponseEntity<List<String>> getDepartmentNamesExcluding(@PathVariable String departmentName) {
        List<String> departmentNames = registerService.getDepartmentNamesExcluding(departmentName);

        if (departmentNames.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no departments found
        }
        return ResponseEntity.ok(departmentNames); // 200 OK with the list of department names
    }
}
