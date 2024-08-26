package com.example.inner_department_communication_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
    private String departmentName;
    private String overlappingProjectName; // Adding project name
    private LocalDateTime overlapDateTime;
}
