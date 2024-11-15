package com.example.testbackend1.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeDTO {
    String employeeId;
    String name;
    String departmentName;
    String positionName;
    double basicSalary;
}
