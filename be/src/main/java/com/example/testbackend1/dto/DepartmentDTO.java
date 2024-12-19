package com.example.testbackend1.dto;

import java.util.stream.Collectors;

import com.example.testbackend1.model.Department;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.util.List;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentDTO {
    private Long id;
    private String departmentName;
    private String departmentCode;
    private Integer foundingYear;
    private Boolean status;
    private List<PositionDTO> positions; 

    
}
