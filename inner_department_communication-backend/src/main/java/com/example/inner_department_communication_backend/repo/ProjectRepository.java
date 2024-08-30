package com.example.inner_department_communication_backend.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.inner_department_communication_backend.model.Project;
import com.example.inner_department_communication_backend.model.Register;

public interface ProjectRepository extends JpaRepository<Project, Long> {
     List<Project> findByDepartment(Register department);

     @Query(value = "SELECT p.* FROM Project p " +
     "WHERE p.location_lat IN (" +
     "    SELECT p1.location_lat FROM Project p1 " +
     "    GROUP BY p1.location_lat " +
     "    HAVING COUNT(DISTINCT p1.department_id) > 1" +
     ") " +
     "AND p.location_lon IN (" +
     "    SELECT p2.location_lon FROM Project p2 " +
     "    GROUP BY p2.location_lon " +
     "    HAVING COUNT(DISTINCT p2.department_id) > 1" +
     ") " +
     "AND p.department_id=(SELECT id FROM register WHERE department_name = ?1 and location=?2)",
nativeQuery = true)
List<Project> findProjectsInLocationsWithMultipleDepartments(String department,String location);




@Transactional
@Query(value = "SELECT p.* FROM project p " +
               "JOIN register r ON p.department_id = r.id " +
               "JOIN priority pr ON r.department_name = pr.department " +
               "WHERE p.location_lon = (SELECT location_lon FROM project WHERE id = ?1) " +
               "AND p.location_lat = (SELECT location_lat FROM project WHERE id = ?1) " +
               "ORDER BY pr.priority ASC, p.start_date", nativeQuery = true)
public List<Project> getProjectWithSameLocation(Long id);





     Optional<Project> findById(Long id);

     @Transactional
     @Query(value = "SELECT p.* FROM project p where project_manager_id=?1", nativeQuery = true)
     public List<Project> findProjectManagerId(Long id);

     List<Project> findBySiteEngineer(String siteEngineer);

}
