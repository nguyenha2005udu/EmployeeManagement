package com.example.testbackend1.controller;

import com.example.testbackend1.dto.SalaryDTO;
import com.example.testbackend1.model.Employee;
import com.example.testbackend1.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Tạo nhân viên
    @PostMapping("/add-employee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    // Lấy tất cả nhân viên
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Lấy thông tin nhân viên theo ID
    @GetMapping("/{employeeId}")
    public Employee getEmployeeById(@PathVariable String employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    // Cập nhật thông tin nhân viên
    @PutMapping("/{employeeId}")
    public Employee updateEmployee(@PathVariable String employeeId, @RequestBody Employee updatedEmployee) {
        return employeeService.updateEmployee(employeeId, updatedEmployee);
    }

    // Xóa nhân viên theo ID
    @DeleteMapping("/{employeeId}")
    public void deleteEmployee(@PathVariable String employeeId) {
        employeeService.deleteEmployee(employeeId);
    }

    // Tính lương hàng năm của nhân viên theo Employee ID và năm
    @GetMapping("/{employeeId}/salary/{year}")
    public Map<Integer, SalaryDTO> getAnnualSalary(@PathVariable String employeeId, @PathVariable int year) {
        return employeeService.calculateAnnualSalary(employeeId, year);
    }

    @GetMapping("/{employeeId}/salary/{month}/{year}")
    public SalaryDTO getMonthlySalary(@PathVariable String employeeId, @PathVariable int month, @PathVariable int year) {
        // Tính tổng số giờ làm việc trong tháng và năm
        double totalHoursWorked = employeeService.calculateTotalHoursWorked(employeeId, month, year);

        // Lấy thông tin nhân viên
        Employee employee = employeeService.getEmployeeById(employeeId);

        // Tính lương và trả về SalaryDTO
        return employeeService.getSalaryDTO(employeeId, employee, totalHoursWorked);
    }

}
