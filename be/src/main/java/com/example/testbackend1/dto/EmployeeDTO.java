package com.example.testbackend1.dto;

import com.example.testbackend1.model.Employee;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeDTO {
    private Long id;
    private String employeeId;
    private String name;
    private String departmentName;
    private String positionName;

    // Constructor để ánh xạ từ Employee (có thể tùy chọn)
    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.employeeId = employee.getEmployeeId();
        this.name = employee.getName();
        // Set departmentName and positionName based on relationships
        this.departmentName = employee.getDepartment() != null ? employee.getDepartment().getName() : null;
        this.positionName = employee.getPosition() != null ? employee.getPosition().getName() : null;
    }
}
