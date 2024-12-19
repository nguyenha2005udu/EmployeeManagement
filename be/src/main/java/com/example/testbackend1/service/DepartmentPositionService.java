package com.example.testbackend1.service;

import com.example.testbackend1.model.Department;
import com.example.testbackend1.model.DepartmentPosition;
import com.example.testbackend1.model.Position;
import com.example.testbackend1.repository.DepartmentPositionRepository;
import com.example.testbackend1.repository.DepartmentRepository;
import com.example.testbackend1.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentPositionService {
    @Autowired
    private DepartmentPositionRepository departmentPositionRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    // Tạo liên kết giữa Department và Position
    public DepartmentPosition addDepartmentPosition(String departmentCode, String positionCode) {
        if (departmentCode == null || positionCode == null) {
            throw new IllegalArgumentException("Department code and position code cannot be null");
        }

        Department department = departmentRepository.findByDepartmentCode(departmentCode)
                .orElseThrow(() -> new RuntimeException("Department not found with code: " + departmentCode));

        Position position = positionRepository.findByPositionCode(positionCode)
                .orElseThrow(() -> new RuntimeException("Position not found with code: " + positionCode));

        DepartmentPosition departmentPosition = new DepartmentPosition();
        departmentPosition.setDepartment(department);
        departmentPosition.setPosition(position);

        return departmentPositionRepository.save(departmentPosition);
    }

    // Lấy tất cả liên kết DepartmentPosition
    public List<DepartmentPosition> getAllDepartmentPositions() {
        return departmentPositionRepository.findAll();
    }
    public void deleteDepartmentPosition(Long id) {
        if (!departmentPositionRepository.existsById(id)) {
            throw new RuntimeException("DepartmentPosition not found with ID: " + id);
        }
        departmentPositionRepository.deleteById(id);
    }
}