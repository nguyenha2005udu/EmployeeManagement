package com.example.testbackend1.service;

import com.example.testbackend1.model.Attendance;
import com.example.testbackend1.model.Employee;
import com.example.testbackend1.repository.AttendanceRepository;
import com.example.testbackend1.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Cập nhật thông tin chấm công
    public Attendance updateAttendance(Long id, Attendance updateAttendance) {
        Attendance existingAttendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with ID: " + id));

        existingAttendance.setDate(updateAttendance.getDate());
        existingAttendance.setCheckIn(updateAttendance.getCheckIn());
        existingAttendance.setCheckOut(updateAttendance.getCheckOut());

        // Tính toán thời gian làm việc
        if (existingAttendance.getCheckIn() != null && existingAttendance.getCheckOut() != null) {
            Duration duration = Duration.between(existingAttendance.getCheckIn(), existingAttendance.getCheckOut());
            existingAttendance.setWorkDuration(duration.toMinutes() / 60.0); // Lưu thời gian làm việc
        }

        return attendanceRepository.save(existingAttendance);
    }

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }
    // Lấy bản ghi chấm công theo employeeId
    public Attendance findByEmployeeEmployeeId(String employeeId) {
        return attendanceRepository.findByEmployeeEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));
    }

    public double calculateTotalHoursWorkedByDate(String employeeId, LocalDate date) {
        List<Attendance> attendances = attendanceRepository.findByEmployeeEmployeeIdAndDate(employeeId, date);
        double totalHours = 0;

        for (Attendance attendance : attendances) {
            if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
                Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
                totalHours += duration.toMinutes() / 60.0; // Chuyển đổi từ phút sang giờ
            }
        }

        return totalHours;
    }

    public Attendance addAttendance(Attendance attendance) {
        String employeeId = attendance.getEmployee() != null ? attendance.getEmployee().getEmployeeId() : null;
        if (employeeId == null) {
            throw new RuntimeException("Employee cannot be null");
        }

        Employee existsByEmployee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));

        attendance.setEmployee(existsByEmployee);

        // Tính toán thời gian làm việc
        if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
            Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
            attendance.setWorkDuration(duration.toMinutes() / 60.0); // Lưu thời gian làm việc
        }

        return attendanceRepository.save(attendance);
    }

    // Tính tổng số giờ làm việc của nhân viên trong một khoảng thời gian
    public double calculateTotalHoursWorked(String employeeId, LocalDate startDate, LocalDate endDate) {
        List<Attendance> attendances = attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
        double totalHours = 0;

        for (Attendance attendance : attendances) {
            if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
                Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
                totalHours += duration.toMinutes() / 60.0; // Chuyển đổi từ phút sang giờ
            }
        }

        return totalHours;
    }

    public List<Attendance> getAttendancesByDate(int day, int month, int year) {
        // Tạo LocalDate từ ngày, tháng, năm
        LocalDate date = LocalDate.of(year, month, day);

        // Truy vấn bản ghi theo ngày
           return attendanceRepository.findByDate(date);
    }


    public List<Attendance> getAttendancesByEmployeeAndMonthYear(String employeeId, int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1); // Ngày đầu tháng
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); // Ngày cuối tháng
        return attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
    }

    public List<Attendance> getAttendancesByEmployee(String employeeId, int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1); // First day of the month
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); // Last day of the month
        return attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
    }
}