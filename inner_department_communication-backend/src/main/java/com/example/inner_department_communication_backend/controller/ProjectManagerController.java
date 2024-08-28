package com.example.inner_department_communication_backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.inner_department_communication_backend.DTO.ProjectManagerResponseDTO;
import com.example.inner_department_communication_backend.model.ProjectManager;
import com.example.inner_department_communication_backend.service.ProjectManagerService;

@RestController
@CrossOrigin("*")
public class ProjectManagerController {

    @Autowired
    private ProjectManagerService projectManagerService;

    @PostMapping("post-new-manager/{departmentName}/{departmentLocation}/{projectId}")
    public ResponseEntity<Void> createProjectManager(
            @RequestBody ProjectManager projectManager,
            @PathVariable String departmentName,
            @PathVariable String departmentLocation,
            @PathVariable Long projectId) {

                try {
                    projectManagerService.createProjectManager(projectManager, departmentName, departmentLocation, projectId);
                    return new ResponseEntity<>(HttpStatus.CREATED);
                } catch (RuntimeException e) {
                   
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
    }


    @PostMapping("assign-exist-manager/{projectManagerEmail}/{projectId}")
public ResponseEntity<Void> assignManagerToProject(
        @PathVariable String projectManagerEmail,
        @PathVariable Long projectId) {

    try {
        projectManagerService.assignExistingManagerToProject(projectManagerEmail, projectId);
        return new ResponseEntity<>(HttpStatus.OK);
    } catch (RuntimeException e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}





      @GetMapping("/get-managers/{departmentName}/{departmentLocation}")
    public ResponseEntity<List<ProjectManagerResponseDTO>> getProjectManagers(
            @PathVariable String departmentName,
            @PathVariable String departmentLocation) {

        List<ProjectManager> managers = projectManagerService.getProjectManagersByDepartment(departmentName, departmentLocation);

        if (managers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<ProjectManagerResponseDTO> response = managers.stream()
                .map(pm -> new ProjectManagerResponseDTO(pm.getName(), pm.getEmail()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @PostMapping("/projectManagerLogin")
    public ResponseEntity<?> projectManagerLogin(@RequestBody ProjectManager projectManager)
    {
        Boolean isLoggedIn = projectManagerService.projectManagerLogin(projectManager.getEmail(),projectManager.getPassword());
        if(isLoggedIn)
        {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
