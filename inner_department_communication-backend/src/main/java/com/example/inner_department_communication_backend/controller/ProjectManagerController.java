package com.example.inner_department_communication_backend.controller;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.inner_department_communication_backend.DTO.ProjectManagerResponseDTO;
import com.example.inner_department_communication_backend.model.Image;
import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.ProjectManager;
import com.example.inner_department_communication_backend.repo.ImageRepository;
import com.example.inner_department_communication_backend.repo.ProjectRepository;
import com.example.inner_department_communication_backend.service.ProjectManagerService;
import com.example.inner_department_communication_backend.service.ProjectService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class ProjectManagerController {

    @Autowired
    private ProjectManagerService projectManagerService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ImageRepository imageRepository;

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
    public ResponseEntity<String> projectManagerLogin(@RequestBody ProjectManager projectManager)
    {
        ProjectManager isLoggedIn = projectManagerService.projectManagerLogin(projectManager.getEmail(),projectManager.getPassword());
        if(isLoggedIn!=null)
        {
            String id = isLoggedIn.getId().toString() + "#" + isLoggedIn.getName().toString();
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/getManagerProjects/{id}")
    public List<Project> getManagerProjects(@PathVariable int id) {
        return projectService.getManagerProjects(id);
    }



    @PostMapping("/completeProject/{projectId}")
public ResponseEntity<String> completeProject(
        @PathVariable Long projectId,
        @RequestParam("finalCost") String finalCost,
        @RequestParam("endDate") String endDate,
        @RequestParam("images") List<MultipartFile> images) {
    try {
        // Find the project to update
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Update project details
        project.setCost(Double.parseDouble(finalCost));
        project.setEndDate(endDate);
        projectRepository.save(project);

        // Process images
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (file != null && !file.isEmpty()) {
                    Image image = new Image();
                    image.setImageName(file.getOriginalFilename());
                    image.setImageType(file.getContentType());
                    image.setData(file.getBytes());
                    image.setProject(project);
                    imageRepository.save(image);
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No image files provided.");
        }

        return ResponseEntity.ok("Project marked as completed and images uploaded successfully");
    } catch (NumberFormatException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid final cost format.");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing file: " + e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Unexpected error: " + e.getMessage());
    }
}


}
