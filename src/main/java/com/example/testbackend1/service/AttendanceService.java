package com.example.testbackend1.service;

import com.example.testbackend1.model.Attendance;
import com.example.testbackend1.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> getAttendancesByEmployee(String employeeId, int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1); // Ngày đầu tháng
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); // Ngày cuối tháng
        return attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
    }


    /// Tính tổng số giờ làm việc của nhân viên trong một khoảng thời gian (tháng)
    public double calculateTotalHoursWorked(String employeeId, LocalDate startDate, LocalDate endDate) {
        List<Attendance> attendances = attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
        double totalHours = 0;

        // Duyệt qua các bản ghi chấm công và tính tổng số giờ làm việc
        for (Attendance attendance : attendances) {
            if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
                Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
                totalHours += duration.toMinutes() / 60.0; // Chuyển đổi từ phút sang giờ
            }
        }

        return totalHours;
    }
    public Attendance addAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance); // Lưu bản ghi vào cơ sở dữ liệu
    }
}
