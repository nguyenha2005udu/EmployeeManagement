package com.example.testbackend1.repository;

import com.example.testbackend1.model.Department;
import com.example.testbackend1.model.Employee;
import com.example.testbackend1.model.Position;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@NonNullApi
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Tìm nhân viên thông qua ID nhân viên, trả về Optional
    Optional<Employee> findByEmployeeId(String employeeId);

    // Kiểm tra sự tồn tại của nhân viên
    boolean existsByEmployeeId(String employeeId);

    // Xóa nhân viên bằng ID nhân viên
    void deleteByEmployeeId(String employeeId);

    // Đếm số nhân viên trong một phòng ban và chức vụ
    long countByDepartmentAndPosition(Department department, Position position);

    //Lấy thông tin cơ bản của nhân viên
    @Query("SELECT new com.example.testbackend1.dto.EmployeeDTO(e) FROM Employee e")
    List<Employee> findSomeFields();
}
