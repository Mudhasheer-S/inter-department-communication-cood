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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("/site/engineer/all")
    public List<SiteEngineer> getAllSiteEngineer() {
        return siteEngineerService.getAllEngineer();
    }

    @PostMapping("/assign-exist-engineer/{email}/{id}")
    public void postMethodName(@PathVariable String email, @PathVariable("id") Long project_id) {
        siteEngineerService.updateSiteEngineer(email, project_id);
    }

}
