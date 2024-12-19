package com.example.testbackend1.controller;

import com.example.testbackend1.dto.PositionDTO;
import com.example.testbackend1.model.Department;
import com.example.testbackend1.model.Position;
import com.example.testbackend1.service.PositionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    // Tạo chức vụ mới
    @PostMapping("/add")
    public ResponseEntity<Position> addPosition(@RequestBody Position position) {
        Position createdPosition = positionService.addPosition(position);
        return new ResponseEntity<>(createdPosition, HttpStatus.CREATED);
    }

    // Lấy tất cả chức vụ
    @GetMapping("get-all")
    public ResponseEntity<List<Position>> getAllPositions() {
        List<Position> positions = positionService.getAllPositions();
        return new ResponseEntity<>(positions, HttpStatus.OK);
    }


    @Transactional
    // Xóa chức vụ theo positionCode
    @DeleteMapping("/{positionCode}")
    public ResponseEntity<Void> deletePosition(@PathVariable String positionCode) {
        try {
            positionService.deletePosition(positionCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
