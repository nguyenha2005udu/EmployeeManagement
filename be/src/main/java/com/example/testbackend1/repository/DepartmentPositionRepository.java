package com.example.testbackend1.repository;

import com.example.testbackend1.model.DepartmentPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentPositionRepository extends JpaRepository<DepartmentPosition, Long> {

}