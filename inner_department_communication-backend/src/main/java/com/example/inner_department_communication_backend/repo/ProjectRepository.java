package com.example.inner_department_communication_backend.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.Register;

public interface ProjectRepository extends JpaRepository<Project, Long> {
     List<Project> findByDepartment(Register department);
}
