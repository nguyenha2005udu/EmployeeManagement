package com.example.testbackend1.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Data
@Entity
@Table(name = "attendance")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    Employee employee;

    @Column(name = "date", nullable = false)
    LocalDate date;

    @Column(name = "check_in")
    LocalDateTime checkIn;

    @Column(name = "check_out")
    LocalDateTime checkOut;

    @Column(name = "status")
    String status;

    @Column(name = "note")
    String note;

    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @Column(name = "work_duration")
    Double workDuration;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void setWorkDuration(Double workDuration) {
        this.workDuration = workDuration;
    }
}
