package com.example.inner_department_communication_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.inner_department_communication_backend.DTO.ProjectDTO;
import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.service.ProjectService;

@RestController
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("post-project/{departmentName}/{departmentLocation}")
    public ResponseEntity<?> createProject(
            @PathVariable String departmentName,
            @PathVariable String departmentLocation,
            @RequestBody Project project) {
        Project createdProject = projectService.createProject(project, departmentName,departmentLocation);
        if (createdProject != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Posted Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Department not found");
        }
    }

 @GetMapping("get-project/by-department/{departmentName}/{location}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByDepartmentName(
            @PathVariable String departmentName,@PathVariable String location) {
        List<ProjectDTO> projectDTOs = projectService.getProjectsByDepartmentName(departmentName,location);
        if (projectDTOs.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no projects found
        }
        return ResponseEntity.ok(projectDTOs); // 200 OK with the list of ProjectDTOs
    }

    @GetMapping("/intersecting-departments/{department}/{location}")
    public List<ProjectDTO> getProjectsInLocationsWithMultipleDepartments(@PathVariable String department,@PathVariable String location) {
        return projectService.getProjectsInLocationsWithMultipleDepartments(department,location);
    }

    @GetMapping("/getProjectsWithSameLocation/{id}")
    public List<ProjectDTO> getProjectsWithSameLocation(@PathVariable Long id) {
        return projectService.getProjectWithSameLocation(id);
    }
}