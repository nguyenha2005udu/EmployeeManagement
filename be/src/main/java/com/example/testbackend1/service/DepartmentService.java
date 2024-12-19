package com.example.testbackend1.service;

import com.example.testbackend1.model.Department;
import com.example.testbackend1.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    // tao phong ban
    public Department addDepartment(Department department) {
        return departmentRepository.save(department);
    }
    
    // lay tat ca phong ban
    public List<Department> getAllDepartments() {
        return  departmentRepository.findAll();
    }
    // lay phong ban theo code
    public Department getDepartmentByCode(String departmentCode) {
        return departmentRepository.findByDepartmentCode(departmentCode)
                .orElseThrow(() -> new RuntimeException("Department not found with code: " + departmentCode));
    }
    // xoa phong ban theo code
    public void deleteDepartment(String departmentCode) {
        if (!departmentRepository.existsByDepartmentCode(departmentCode)) {
            throw  new RuntimeException("Department not found");
        }
        departmentRepository.deleteByDepartmentCode(departmentCode);
    }
    // update phong ban theo code
    public Department updateDepartment(String code, Department department) {
        Department existingDepartment = departmentRepository.findByDepartmentCode(code)
            .orElseThrow(() -> new RuntimeException("Department not found"));
        existingDepartment.setDepartmentName(department.getDepartmentName());
        existingDepartment.setFoundingYear(department.getFoundingYear());
        existingDepartment.setStatus(department.getStatus());
        return departmentRepository.save(existingDepartment);
    }
}
