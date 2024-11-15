package com.example.testbackend1.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentDTO {
    String departmentCode;
    String departmentName;
    int foundingYear;
    String status;
}
