package com.example.inner_department_communication_backend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;

    // One-to-Many relationship with Project (One ProjectManager can manage multiple Projects)
    @OneToMany(mappedBy = "projectManager", cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();

    // Many-to-Many relationship with Register (Many ProjectManagers can belong to multiple Departments)
    @ManyToMany
    @JoinTable(
        name = "project_manager_department",
        joinColumns = @JoinColumn(name = "project_manager_id"),
        inverseJoinColumns = @JoinColumn(name = "department_id")
    )
    private List<Register> departments = new ArrayList<>();
}
