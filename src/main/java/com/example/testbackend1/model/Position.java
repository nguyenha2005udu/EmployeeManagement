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
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String positionName;
    @Size(max = 1, message = "PstCode chỉ được tối đa 1 ký tự")
    String positionCode;

    public @Size(max = 1, message = "PstCode chỉ được tối đa 1 ký tự") String getPositionCode() {
        return positionCode;
    }

    public void setPositionCode(@Size(max = 1, message = "PstCode chỉ được tối đa 1 ký tự") String positionCode) {
        this.positionCode = positionCode;
    }
}
