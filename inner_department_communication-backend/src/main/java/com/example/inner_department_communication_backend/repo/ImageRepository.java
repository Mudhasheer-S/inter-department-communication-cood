package com.example.inner_department_communication_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.inner_department_communication_backend.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}