package com.example.testbackend1.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttendanceDTO {
    private Long id;
    private Long employeeId;
    private LocalDate date;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private String status;
    private String note;
    private Double workDuration;
}
