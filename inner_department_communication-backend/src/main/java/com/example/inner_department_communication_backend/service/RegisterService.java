package com.example.inner_department_communication_backend.service;

import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inner_department_communication_backend.model.Register;
import com.example.inner_department_communication_backend.repo.RegisterRepository;

@Service
public class RegisterService {
      @Autowired
    private RegisterRepository registerRepository;

    public boolean registerUser(Register register) {
        try {
            registerRepository.save(register);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


     
    public String loginAndGetDepartmentName(String email, String password) {
        Optional<Register> optionalRegister = registerRepository.findByEmail(email);
        if (optionalRegister.isPresent()) {
            Register register = optionalRegister.get();
            if (register.getPassword().equals(password)) {
                return register.getDepartmentName();
            }
        }
        return null;
    }



    //get

    public List<String> getDepartmentNamesExcluding(String departmentName) {
        return registerRepository.findDepartmentNamesExcluding(departmentName);
    }
}
