package com.example.inner_department_communication_backend.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inner_department_communication_backend.DTO.ProjectDTO;
import com.example.inner_department_communication_backend.DTO.ProjectManagerResponseDTO;
import com.example.inner_department_communication_backend.model.Notification;
import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.ProjectManager;
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

    // post
    public Project createProject(Project project, String departmentName, String departmentLocation) {
        Register department = registerRepository.findByDepartmentNameAndLocation(departmentName, departmentLocation)
                .orElseThrow(() -> new RuntimeException("Department not found"));
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

    public List<ProjectDTO> getProjectsInLocationsWithMultipleDepartments(String department, String location) {
        try {
            List<Object[]> results = projectRepository.findProjectsInLocationsWithMultipleDepartments(department,
                    location);
            return results.stream().map(result -> {
                ProjectDTO dto = new ProjectDTO();
                dto.setName((String) result[0]);
                dto.setDescription((String) result[1]);
                dto.setStartDate((String) result[2]);
                dto.setId((Long) result[3]);
                dto.setLocationName((String) result[4]);
                return dto;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            // Log exception
            e.printStackTrace();
            throw new RuntimeException("Error fetching projects", e);
        }
    }

    public List<ProjectDTO> getProjectWithSameLocation(Long id) {
        try {
            List<Object[]> results = projectRepository.getProjectWithSameLocation(id);

            return results.stream().map(result -> {
                ProjectDTO dto = new ProjectDTO();
                dto.setId((Long) result[0]);
                dto.setName((String) result[1]);
                dto.setDescription((String) result[2]);
                dto.setStartDate((String) result[3]);
                dto.setLocationName((String) result[4]);
                dto.setStatus((String) result[5]);
                dto.setDepartmentName((String) result[6]);
                return dto;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching projects", e);
        }
    }

    public List<ProjectDTO> getProjectsInLocationsWithMultipleDepartments(String department, String location) {
        try {
            List<Object[]> results = projectRepository.findProjectsInLocationsWithMultipleDepartments(department,
                    location);
            System.out.print("------------------------------**********************************************" + results);
            return results.stream().map(result -> {
                ProjectDTO dto = new ProjectDTO();
                dto.setName((String) result[0]);
                dto.setDescription((String) result[1]);
                dto.setStartDate((String) result[2]);
                dto.setId((Long) result[3]);
                dto.setLocationName((String) result[4]);
                return dto;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            // Log exception
            e.printStackTrace();
            throw new RuntimeException("Error fetching projects", e);
        }
    }

    public List<ProjectDTO> getProjectWithSameLocation(Long id) {
        try {
            List<Object[]> results = projectRepository.getProjectWithSameLocation(id);

            return results.stream().map(result -> {
                ProjectDTO dto = new ProjectDTO();
                dto.setId((Long) result[0]);
                dto.setName((String) result[1]);
                dto.setDescription((String) result[2]);
                dto.setStartDate((String) result[3]);
                dto.setLocationName((String) result[4]);
                dto.setStatus((String) result[5]);
                dto.setDepartmentName((String) result[6]);
                // dto.setSiteEngineer((String) result[7]);
                return dto;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching projects", e);
        }
    }

    // get
    public List<ProjectDTO> getProjectsByDepartmentName(String departmentName, String location) {
        Register department = registerRepository.findByDepartmentNameAndLocation(departmentName, location)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        if (department != null) {
            List<Project> projects = projectRepository.findByDepartment(department);
            return projects.stream()
                    .map(this::convertToDTO) // Convert each Project to ProjectDTO
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<ProjectDTO> getByLocation(String locationName) {
        List<Project> projects = projectRepository.findByLocationName(locationName);
        return projects.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setLocationName(project.getLocationName());
        dto.setLocationLat(project.getLocationLat());
        dto.setLocationLon(project.getLocationLon());
        dto.setStatus(project.getStatus());
        dto.setStartDate(project.getStartDate());
        dto.setDuration(project.getDuration());
        dto.setAccess(project.getAccess());
        dto.setSiteEngineer(project.getSiteEngineer());

        // Set Project Manager if present
        ProjectManager manager = project.getProjectManager();
        if (manager != null) {
            ProjectManagerResponseDTO managerDTO = new ProjectManagerResponseDTO();
            managerDTO.setName(manager.getName());
            managerDTO.setEmail(manager.getEmail());
            dto.setProjectManager(managerDTO); // Set the ProjectManagerResponseDTO in ProjectDTO
        }

        return dto;
    }

    public List<ProjectDTO> getManagerProjects(Long id) {
        List<Project> projects = projectRepository.findProjectManagerId(id);
        return projects.stream()
                .map(this::convertToDTO) // Convert each Project to ProjectDTO
                .collect(Collectors.toList());
        // return projectRepository.findProjectManagerId(id);
    }
}