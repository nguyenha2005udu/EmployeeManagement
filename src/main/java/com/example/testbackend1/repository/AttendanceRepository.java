package com.example.testbackend1.repository;

import com.example.testbackend1.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeEmployeeId(String employeeId); // Tìm tất cả chấm công theo mã nhân viên
    List<Attendance> findByEmployeeEmployeeIdAndDate(String employeeId, LocalDate date); // Tìm chấm công theo mã nhân viên và ngày
    List<Attendance> findByEmployeeEmployeeIdAndDateBetween(String employeeId, LocalDate startDate, LocalDate endDate); // Tìm chấm công theo khoảng thời gian
}
