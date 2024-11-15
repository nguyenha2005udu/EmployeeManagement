package com.example.testbackend1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id; // id trong database
    String departmentName;
    @Size(max = 3, message = "DptCode chỉ được tối đa 3 ký tự")
    String departmentCode; // ma phong ban
    int foundingYear; // nam thanh lap
    String status; // trang thai

    public @Size(max = 3, message = "DptCode chỉ được tối đa 3 ký tự") String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(@Size(max = 3, message = "DptCode chỉ được tối đa 3 ký tự") String departmentCode) {
        this.departmentCode = departmentCode;
    }
}
