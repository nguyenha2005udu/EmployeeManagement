package com.example.testbackend1.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
@Data
@Entity
@Table(name = "employee")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "employee_id", nullable = false, unique = true)
    String employeeId;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "dob") // Ngày sinh
    LocalDate dob;

    @Column(name = "phone") // Số điện thoại
    String phone;

    @Column(name = "address") // Địa chỉ
    String address;

    @Enumerated(EnumType.STRING) // Ánh xạ ENUM trong Java
    @Column(name = "gender", columnDefinition = "ENUM('Nam', 'Nữ', 'Khác') DEFAULT 'Khác'")
    Gender gender;

    @Column(name = "hire_date", nullable = false) // Ngày vào làm
    LocalDate hireDate;

    @ManyToOne
    @JoinColumn(name = "department_id")
    Department department;

    @ManyToOne
    @JoinColumn(name = "position_id")
    Position position;

    @Column(name = "basic_salary", nullable = false)
    BigDecimal basicSalary;

    @Column(name = "email", unique = true)
    String email;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean status;


    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    public enum Gender {
        Nam, Nữ, Khác
    }

    public LocalDate getHireDate() {
        return hireDate;
    }
    

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = (hireDate != null) ? hireDate : LocalDate.now(); // Gán giá trị hiện tại nếu không có dữ liệu truyền vào
    }
} 