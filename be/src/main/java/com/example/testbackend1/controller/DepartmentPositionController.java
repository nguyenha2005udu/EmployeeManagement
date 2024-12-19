package com.example.testbackend1.controller;

import com.example.testbackend1.dto.DepartmentPositionDTO;
import com.example.testbackend1.model.DepartmentPosition;
import com.example.testbackend1.service.DepartmentPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department-positions")
public class DepartmentPositionController {

    @Autowired
    private DepartmentPositionService departmentPositionService;

    @PostMapping("/add")
    public ResponseEntity<DepartmentPosition> addDepartmentPosition(@RequestBody DepartmentPositionDTO dto) {
        if (dto.getDepartmentCode() == null || dto.getPositionCode() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        DepartmentPosition createdDepartmentPosition = departmentPositionService.addDepartmentPosition(dto.getDepartmentCode(), dto.getPositionCode());
        return new ResponseEntity<>(createdDepartmentPosition, HttpStatus.CREATED);
    }

    // Lấy tất cả liên kết DepartmentPosition
    @GetMapping("get-all")
    public ResponseEntity<List<DepartmentPosition>> getAllDepartmentPositions() {
        List<DepartmentPosition> departmentPositions = departmentPositionService.getAllDepartmentPositions();
        return new ResponseEntity<>(departmentPositions, HttpStatus.OK);
    }
    // Xóa liên kết theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartmentPosition(@PathVariable Long id) {
        try {
            departmentPositionService.deleteDepartmentPosition(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}