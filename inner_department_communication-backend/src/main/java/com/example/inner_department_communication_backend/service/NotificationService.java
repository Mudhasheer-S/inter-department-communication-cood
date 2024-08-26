package com.example.inner_department_communication_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import com.example.inner_department_communication_backend.DTO.NotificationDTO;
import com.example.inner_department_communication_backend.model.Notification;
import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.repo.NotificationRepository;
import com.example.inner_department_communication_backend.repo.ProjectRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ProjectRepository projectRepository;



    public List<NotificationDTO> getNotificationsByDepartmentName(String departmentName) {
        List<Notification> notifications = notificationRepository.findByDepartmentName(departmentName);
        return notifications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setDepartmentName(findDepartmentNameByProjectId(notification.getOverlappingProjectId()));
        dto.setOverlappingProjectName(findProjectNameById(notification.getOverlappingProjectId())); // Convert ID to name
        dto.setOverlapDateTime(notification.getOverlapDateTime());
        return dto;
    }

    private String findProjectNameById(Long projectId) {
        return projectRepository.findById(projectId)
            .map(Project::getName)
            .orElse("Unknown Project");
    }

    private String findDepartmentNameByProjectId(Long projectId) {
        return projectRepository.findById(projectId)
            .map(project -> project.getDepartment().getDepartmentName()) // Get department name from project
            .orElse("Unknown Department");
    }
}
