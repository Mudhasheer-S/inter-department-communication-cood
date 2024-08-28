package com.example.inner_department_communication_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.ProjectManager;
import com.example.inner_department_communication_backend.model.Register;
import com.example.inner_department_communication_backend.repo.ProjectManagerRepository;
import com.example.inner_department_communication_backend.repo.ProjectRepository;
import com.example.inner_department_communication_backend.repo.RegisterRepository;

@Service
public class ProjectManagerService {

    @Autowired
    private ProjectManagerRepository projectManagerRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private RegisterRepository registerRepository;

    //Assign new Manager
    public ProjectManager createProjectManager(ProjectManager projectManager, String departmentName, String departmentLocation, Long  projectId) {
        
        Register department = registerRepository.findByDepartmentNameAndLocation(departmentName, departmentLocation)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Set department reference for ProjectManager
        projectManager.getDepartments().add(department);

        // Set project reference for ProjectManager
        project.setProjectManager(projectManager);

        // Save ProjectManager and cascade the relationship
        projectManager.getProjects().add(project);

        return projectManagerRepository.save(projectManager);
    }

    //Assign existing Manager
    public void assignExistingManagerToProject(String projectManagerEmail, Long projectId) {
        
        ProjectManager projectManager = projectManagerRepository.findByEmail(projectManagerEmail)
                .orElseThrow(() -> new RuntimeException("Project Manager not found"));

        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Set project reference for ProjectManager
        projectManager.getProjects().add(project);

        // Set ProjectManager reference in Project
        project.setProjectManager(projectManager);

        // Save updated ProjectManager and Project
        projectManagerRepository.save(projectManager);
        projectRepository.save(project);
    }



    //get
    public List<ProjectManager> getProjectManagersByDepartment(String departmentName, String departmentLocation) {
       
        return projectManagerRepository.findByDepartments_DepartmentNameAndDepartments_Location(departmentName, departmentLocation);
    }

    public Boolean projectManagerLogin(String email,String password)
    {
        List<ProjectManager> projectManager = projectManagerRepository.findByEmailAndPassword(email,password);
        if(projectManager.size()>0)
        {
            return true;
        }
        return false;
    }
}
