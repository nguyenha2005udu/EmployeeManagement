package com.example.testbackend1.dto;

import com.example.testbackend1.model.Attendance;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeAttendanceDTO {
    List<Attendance> attendances; // Danh sách chấm công của nhân viên
}