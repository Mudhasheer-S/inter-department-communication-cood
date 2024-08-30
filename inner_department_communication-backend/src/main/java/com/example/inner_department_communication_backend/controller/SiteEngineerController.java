package com.example.inner_department_communication_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.SiteEngineer;
import com.example.inner_department_communication_backend.service.SiteEngineerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;



@RestController
@CrossOrigin("*")
public class SiteEngineerController {
    
    @Autowired
    private SiteEngineerService siteEngineerService;

    @GetMapping("/site/engineer/{email}")
    public SiteEngineer getMethodName(@PathVariable String email) {
        return siteEngineerService.getDetails(email);
    }

    @GetMapping("site/engineer/project/{email}")
    public List<Project> getMethodProject(@PathVariable String email) {
        return siteEngineerService.getProjectForSite(email);
    }
    
    
}
