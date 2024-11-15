package com.example.testbackend1.repository;

import com.example.testbackend1.model.Department;
import com.example.testbackend1.model.Employee;
import com.example.testbackend1.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Tìm nhân viên thông qua ID nhân viên, trả về Optional
    Optional<Employee> findByEmployeeId(String employeeId);

    // Kiểm tra sự tồn tại của nhân viên
    boolean existsByEmployeeId(String employeeId);

    // Xóa nhân viên bằng ID nhân viên
    void deleteByEmployeeId(String employeeId);

    // Đếm số nhân viên trong một phòng ban và chức vụ
    long countByDepartmentAndPosition(Department department, Position position);
}
