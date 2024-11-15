package com.example.testbackend1.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttendanceDTO {
    String employeeId;
    LocalDateTime checkIn;
    LocalDateTime checkOut;
    double totalHoursWorked; // tong so gio lam viec
}
