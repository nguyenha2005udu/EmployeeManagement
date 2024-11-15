package com.example.testbackend1.controller;

import com.example.testbackend1.model.Attendance;
import com.example.testbackend1.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Thêm mới bản ghi chấm công cho nhân viên
    @PostMapping("/add")
    public ResponseEntity<Attendance> addAttendance(@RequestBody Attendance attendance) {
        // Thêm bản ghi chấm công mới vào hệ thống
        Attendance createdAttendance = attendanceService.addAttendance(attendance);
        return new ResponseEntity<>(createdAttendance, HttpStatus.CREATED);
    }

    // Lấy danh sách chấm công của nhân viên trong tháng
    @GetMapping("/employee/{employeeId}/{month}/{year}")
    public ResponseEntity<List<Attendance>> getAttendancesByEmployee(@PathVariable String employeeId, @PathVariable int month, @PathVariable int year) {
        // Lấy danh sách chấm công của nhân viên trong tháng và năm
        List<Attendance> attendances = attendanceService.getAttendancesByEmployee(employeeId, month, year);
        return new ResponseEntity<>(attendances, HttpStatus.OK);
    }

    // Lấy tổng số giờ làm việc của nhân viên trong tháng
    @GetMapping("/total-hours/{employeeId}/{month}/{year}")
    public ResponseEntity<Double> getTotalHoursWorked(@PathVariable String employeeId, @PathVariable int month, @PathVariable int year) {
        // Tính tổng số giờ làm việc của nhân viên trong tháng và năm
        LocalDate startDate = LocalDate.of(year, month, 1); // Ngày đầu tháng
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); // Ngày cuối tháng
        double totalHours = attendanceService.calculateTotalHoursWorked(employeeId, startDate, endDate); // Sửa chỗ này gọi đúng service
        return new ResponseEntity<>(totalHours, HttpStatus.OK);
    }

}
