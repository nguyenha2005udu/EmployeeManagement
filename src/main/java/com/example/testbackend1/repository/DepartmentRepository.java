package com.example.testbackend1.repository;

import com.example.testbackend1.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // tim phong ban qua code
    Department findByDepartmentCode(String departmentCode);

    // kiem tra su ton tai cua phong ban
    boolean existsByDepartmentCode(String departmentCode);

    // xoa cmn phong ban di
    void deleteByDepartmentCode(String departmentCode);

}
