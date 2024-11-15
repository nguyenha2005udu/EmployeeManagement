package com.example.testbackend1.repository;

import com.example.testbackend1.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
    // tim chuc vu theo ma
    Position findByPositionCode(String positionCode);

    // Kiem tra su ton tai
    boolean existsByPositionCode(String positionCode);

    // Xoa chuc vu
    void deleteByPositionCode(String positionCode);
}
