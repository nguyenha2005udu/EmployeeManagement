package com.example.testbackend1.repository;

import com.example.testbackend1.model.Position;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@NonNullApi
public interface PositionRepository extends JpaRepository<Position, Long> {
    Optional<Position> findById(Long id);

    // tim chuc vu theo ma
    Optional<Position> findByPositionCode(String positionCode);

    // Kiem tra su ton tai
    boolean existsByPositionCode(String positionCode);

    // Xoa chuc vu
    void deleteByPositionCode(String positionCode);
}
