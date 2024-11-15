package com.example.testbackend1.service;

import com.example.testbackend1.model.Position;
import com.example.testbackend1.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionService {
    @Autowired
    private PositionRepository positionRepository;

    // tao chuc vu
    public Position addPosition(Position position) {
        return positionRepository.save(position);
    }
    // Lay tat ca chuc vu
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }
    // xoa chuc vu
    public void deletePosition(String positionCode) {
        if (!positionRepository.existsByPositionCode(positionCode)) {
            throw new RuntimeException("Position not found");
        }
        positionRepository.deleteByPositionCode(positionCode);
    }

}
