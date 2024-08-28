package com.example.inner_department_communication_backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.inner_department_communication_backend.model.ProjectManager;

public interface ProjectManagerRepository extends JpaRepository<ProjectManager, Long> {
    Optional<ProjectManager> findByEmail(String email);
    List<ProjectManager> findByDepartments_DepartmentNameAndDepartments_Location(String departmentName, String location);
}
