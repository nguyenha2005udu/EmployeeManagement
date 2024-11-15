package com.example.testbackend1.controller;

import com.example.testbackend1.model.Department;
import com.example.testbackend1.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Tạo phòng ban mới
    @PostMapping("/add")
    public ResponseEntity<Department> addDepartment(@RequestBody Department department) {
        Department createdDepartment = departmentService.addDepartment(department);
        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }

    // Lấy tất cả phòng ban
    @GetMapping("/get-all")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    // Lấy phòng ban theo departmentCode
    @GetMapping("/{departmentCode}")
    public ResponseEntity<Department> getDepartmentByCode(@PathVariable String departmentCode) {
        Department department = departmentService.getDepartmentByCode(departmentCode);
        if (department == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    // Xóa phòng ban theo departmentCode
    @DeleteMapping("/{departmentCode}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable String departmentCode) {
        try {
            departmentService.deleteDepartment(departmentCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
