package com.example.testbackend1.dto;
import com.example.testbackend1.model.Position;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PositionDTO {
    private Long id;
    private String positionName;
    private String positionCode;
    private Boolean status;
    private List<DepartmentDTO> departments;
    
}
