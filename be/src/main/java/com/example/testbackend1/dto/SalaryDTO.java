package com.example.testbackend1.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SalaryDTO {
     String employeeId;
     BigDecimal basicSalary;
     BigDecimal overtimeSalary;
     BigDecimal totalSalary;
}
