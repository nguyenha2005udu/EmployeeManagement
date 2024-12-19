package com.example.testbackend1.repository;

import com.example.testbackend1.model.Department;

import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@NonNullApi // Khai bao rang moi gia tri duoc tham chieu se khong null
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findById(Long id); // Tìm theo id
    // tim phong ban qua code
    Optional<Department> findByDepartmentCode(String departmentCode);

    // kiem tra su ton tai cua phong ban
    boolean existsByDepartmentCode(String departmentCode);

    // xoa cmn phong ban di
    void deleteByDepartmentCode(String departmentCode);

}
