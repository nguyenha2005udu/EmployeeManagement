package com.example.testbackend1.controller;

import com.example.testbackend1.model.Attendance;
import com.example.testbackend1.service.AttendanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Thêm mới bản ghi chấm công cho nhân viên
    @PostMapping("/add")
    public ResponseEntity<Attendance> addAttendance(@RequestBody Attendance attendance) {
        log.info("AttendanceController: add Attendance");
        Attendance createdAttendance = attendanceService.addAttendance(attendance);
        return new ResponseEntity<>(createdAttendance, HttpStatus.CREATED);
    }

    // Lấy tất cả danh sách chấm công
    @GetMapping("/get-all")
    public List<Attendance> getAllAttendances() {
        return attendanceService.getAllAttendances();
    }

    @PutMapping("/{id}")
    public Attendance updateAttendance(@PathVariable Long id, @RequestBody Attendance updateAttendance) {
        return attendanceService.updateAttendance(id, updateAttendance);
    }
    // Tùy chọn
    @GetMapping("/total-hours/{employeeId}/{date}")
    public ResponseEntity<Double> getTotalHoursWorkedByDate(@PathVariable String employeeId, @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date); // Chuyển đổi chuỗi ngày thành LocalDate
        double totalHours = attendanceService.calculateTotalHoursWorkedByDate(employeeId, parsedDate);
        return new ResponseEntity<>(totalHours, HttpStatus.OK);
    }

// Lấy danh sách chấm công của nhân viên trong tháng
    @GetMapping("/employee/{employeeId}/{month}/{year}")
    public ResponseEntity<List<Attendance>> getAttendancesByEmployee(@PathVariable String employeeId, @PathVariable int month, @PathVariable int year) {
        // Sử dụng phương thức mới đã tạo
        List<Attendance> attendances = attendanceService.getAttendancesByEmployeeAndMonthYear(employeeId, month, year);
        return new ResponseEntity<>(attendances, HttpStatus.OK);
    }
    @GetMapping("/{day}/{month}/{year}")
    public ResponseEntity<List<Attendance>> getAttendancesByDate(
            @PathVariable int day,
            @PathVariable int month,
            @PathVariable int year) {
        List<Attendance> attendances = attendanceService.getAttendancesByDate(day, month, year);
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
