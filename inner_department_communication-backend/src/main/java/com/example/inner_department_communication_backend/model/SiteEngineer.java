package com.example.inner_department_communication_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SiteEngineer {
    
    @Id
    private String email;

    private String name;
    private String phone;

}
