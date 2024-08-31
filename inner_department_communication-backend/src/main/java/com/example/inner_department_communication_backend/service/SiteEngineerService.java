package com.example.inner_department_communication_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.SiteEngineer;
import com.example.inner_department_communication_backend.repo.ProjectRepository;
import com.example.inner_department_communication_backend.repo.SiteEngineerRepo;
import java.util.List;

@Service
public class SiteEngineerService {
    
    @Autowired
    private SiteEngineerRepo siteEngineerRepo;
    @Autowired
    private ProjectRepository projectRepository;

    public SiteEngineer getDetails(String email){
        return siteEngineerRepo.findById(email).orElse(null);
    }

    public List<SiteEngineer> getAllEngineer(){
        return siteEngineerRepo.findAll();
    }

    public List<Project> getProjectForSite(String email){
        return projectRepository.findBySiteEngineer(email);
    }

    public void updateSiteEngineer(String email,Long id){

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setSiteEngineer(email);

        projectRepository.save(project);
    }
}
