package com.example.inner_department_communication_backend.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.inner_department_communication_backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByDepartmentName(String departmentName);
}