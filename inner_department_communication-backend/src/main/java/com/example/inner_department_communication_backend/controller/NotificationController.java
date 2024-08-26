package com.example.inner_department_communication_backend.controller;



import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.inner_department_communication_backend.DTO.NotificationDTO;
import com.example.inner_department_communication_backend.service.NotificationService;

@RestController
@CrossOrigin("*")
public class NotificationController {
    
      @Autowired
    private NotificationService notificationService;

    @GetMapping("/notifications/{departmentName}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByDepartmentName(
            @PathVariable String departmentName) {
        List<NotificationDTO> notificationDTOs = notificationService.getNotificationsByDepartmentName(departmentName);
        
        if (notificationDTOs.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no notifications found
        }
        
        return ResponseEntity.ok(notificationDTOs); // 200 OK with the list of notifications
    }

}
