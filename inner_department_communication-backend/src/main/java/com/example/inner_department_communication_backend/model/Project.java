package com.example.inner_department_communication_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String locationName; 
    private double locationLat;  
    private double locationLon; 
    private String status;
    private String startDate;
    private String duration;
    private String access;
    private String siteEngineer;
    private String endDate;
    private double cost;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Register department;


    @ManyToOne
    @JoinColumn(name = "project_manager_id")
    @JsonBackReference
    private ProjectManager projectManager; 

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Image> images;
    

}

