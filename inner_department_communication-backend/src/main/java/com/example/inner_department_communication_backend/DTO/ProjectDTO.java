package com.example.inner_department_communication_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    
    private String name;
    private String description;
    private String locationName;
    private double locationLat;
    private double locationLon;
    private String status;
    private String startDate;
    private String duration;
    private String access;
}
