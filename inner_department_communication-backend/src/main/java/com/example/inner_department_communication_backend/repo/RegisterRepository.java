package com.example.inner_department_communication_backend.repo;

import java.util.Optional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.inner_department_communication_backend.model.Register;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    Optional<Register> findByEmail(String email);

    // Register findByName(String name);
    Optional<Register> findByDepartmentNameAndLocation(String departmentName, String location);

    // Optional<Register> findByDepartmentNameAndLocationAndRole(String
    // departmentName, String location, String role);

    // Optional<Register> findByDepartmentNameAndLocationAndRole(String
    // departmentName, String location, String role);

    @Query("SELECT r.departmentName FROM Register r WHERE r.departmentName <> :departmentName AND r.location = :location")
    List<String> findDepartmentNamesExcluding(@Param("departmentName") String departmentName,
            @Param("location") String location);
}