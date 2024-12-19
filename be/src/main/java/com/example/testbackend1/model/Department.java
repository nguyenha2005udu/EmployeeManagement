package com.example.testbackend1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.CascadeType;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "department")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    @Column(name = "department_code", nullable = false, unique = true)
    @Size(max = 3, message = "Department code chỉ được tối đa 3 ký tự")
    private String departmentCode;

    @Column(name = "founding_year")
    private Integer foundingYear;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean status;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    @JoinTable(name = "department_position",
            joinColumns = @JoinColumn(name = "department_id"),
            inverseJoinColumns = @JoinColumn(name = "position_id"))
    private List<Position> positions = new ArrayList<>();


    public @Size(max = 3, message = "DptCode chỉ được tối đa 3 ký tự") String getDepartmentCode() {
        return departmentCode;
    }
    

    public void setDepartmentCode(@Size(max = 3, message = "DptCode chỉ được tối đa 3 ký tự") String departmentCode) {
        this.departmentCode = departmentCode;
    }


    public String getName() {
        return departmentName;
    }

}
