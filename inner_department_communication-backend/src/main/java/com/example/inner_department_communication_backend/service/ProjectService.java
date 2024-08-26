package com.example.inner_department_communication_backend.service;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.inner_department_communication_backend.DTO.ProjectDTO;
import com.example.inner_department_communication_backend.model.Notification;
import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.Register;
import com.example.inner_department_communication_backend.repo.NotificationRepository;
import com.example.inner_department_communication_backend.repo.ProjectRepository;
import com.example.inner_department_communication_backend.repo.RegisterRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    //post
    public Project createProject(Project project, String departmentName) {
        Register department = registerRepository.findByDepartmentNameAndLocation(departmentName,project.getLocationName());
        if (department != null) {
            project.setDepartment(department);


              Project savedProject = projectRepository.save(project);

            // Check for overlaps and update notifications
            checkAndUpdateNotifications(savedProject);

            return savedProject;
        }
      return null; // Or throw an exception if preferred
    }


      private void checkAndUpdateNotifications(Project newProject) {
        List<Project> allProjects = projectRepository.findAll();
        
        for (Project existingProject : allProjects) {
            if (!existingProject.getId().equals(newProject.getId()) &&
                existingProject.getLocationLat() == newProject.getLocationLat() &&
                existingProject.getLocationLon() == newProject.getLocationLon()) {

                createNotification(existingProject, newProject);
                createNotification(newProject, existingProject);
            }
        }
    }

    private void createNotification(Project project, Project overlappingProject) {
        Notification notification = new Notification();
        notification.setDepartmentName(project.getDepartment().getDepartmentName());
        notification.setOverlappingProjectId(overlappingProject.getId());
        notification.setOverlapDateTime(LocalDateTime.now());
        notification.setProject(project);
        
        notificationRepository.save(notification);
    }


    public List<Project> getProjectsInLocationsWithMultipleDepartments(String department) {
        return projectRepository.findProjectsInLocationsWithMultipleDepartments(department);
    }

    public List<Project> getProjectWithSameLocation(Long id)
    {
        return projectRepository.getProjectWithSameLocation(id);
    }






    //get
    public List<ProjectDTO> getProjectsByDepartmentName(String departmentName,String location) {
        Register department = registerRepository.findByDepartmentNameAndLocation(departmentName,location);
        if (department != null) {
            List<Project> projects = projectRepository.findByDepartment(department);
            return projects.stream()
                           .map(this::convertToDTO) // Convert each Project to ProjectDTO
                           .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setLocationName(project.getLocationName());
        dto.setLocationLat(project.getLocationLat());
        dto.setLocationLon(project.getLocationLon());
        dto.setStatus(project.getStatus());
        dto.setStartDate(project.getStartDate());
        dto.setDuration(project.getDuration());
        dto.setAccess(project.getAccess());
        return dto;
    }
}