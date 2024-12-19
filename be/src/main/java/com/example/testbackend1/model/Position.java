package com.example.testbackend1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "positions")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "position_name", nullable = false)
    String positionName;

    @Column(name = "position_code", nullable = false, unique = true)
    String positionCode;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean status;


    @ManyToMany(mappedBy = "positions", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Department> departments = new ArrayList<>();

    public @Size(max = 3, message = "PstCode chỉ được tối đa 3 ký tự") String getPositionCode() {
        return positionCode;
    }

    public void setPositionCode(@Size(max = 3, message = "PstCode chỉ được tối đa 3 ký tự") String positionCode) {
        this.positionCode = positionCode;
    }


    public String getName(){
        return positionName;
    }
}
