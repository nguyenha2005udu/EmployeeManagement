package com.example.testbackend1.service;

import com.example.testbackend1.dto.SalaryDTO;
import com.example.testbackend1.model.Attendance;
import com.example.testbackend1.model.Department;
import com.example.testbackend1.model.Employee;
import com.example.testbackend1.model.Position;
import com.example.testbackend1.repository.EmployeeRepository;
import com.example.testbackend1.repository.DepartmentRepository;
import com.example.testbackend1.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private AttendanceService attendanceService;
    // Thêm nhân viên mới
    public Employee addEmployee(Employee employee) {
        // Lấy departmentCode và positionCode từ đối tượng
        String departmentCode = employee.getDepartment() != null ? employee.getDepartment().getDepartmentCode() : null;
        String positionCode = employee.getPosition() != null ? employee.getPosition().getPositionCode() : null;

        if (departmentCode == null || positionCode == null) {
            throw new RuntimeException("Department or Position cannot be null");
        }

        // Tìm kiếm department và position từ cơ sở dữ liệu theo code
        Department existingDepartment = departmentRepository.findByDepartmentCode(departmentCode)
                .orElseThrow(() -> new RuntimeException("Department not found with code: " + departmentCode));

        Position existingPosition = positionRepository.findByPositionCode(positionCode)
                .orElseThrow(() -> new RuntimeException("Position not found with code: " + positionCode));

                employee.setDepartment(existingDepartment);
                employee.setPosition(existingPosition);
        long count = employeeRepository.countByDepartmentAndPosition(existingDepartment, existingPosition);
        // Sử dụng departmentCode và positionCode để tạo employeeId
        String employeeId = departmentCode + positionCode + String.format("%04d", count + 1);

        employee.setEmployeeId(employeeId);
        return employeeRepository.save(employee);
    }
    /* 
    // Lấy tất cả thông tin cơ bản  nhân viên
    public List<Employee> getSomeEmployeeFields() {
        return employeeRepository.findSomeFields();
    }
    */
    // Lấy tất cả thông tin chi tiết nhân viên
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Lấy thông tin nhân viên theo Employee ID
    public Employee getEmployeeById(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));
    }

    // Cập nhật thông tin nhân viên
    public Employee updateEmployee(String employeeId, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));

        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setDob(updatedEmployee.getDob());
        existingEmployee.setAddress(updatedEmployee.getAddress());
        existingEmployee.setPhone(updatedEmployee.getPhone());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setGender(updatedEmployee.getGender());
        existingEmployee.setHireDate(updatedEmployee.getHireDate());
        existingEmployee.setBasicSalary(updatedEmployee.getBasicSalary());
        
        return employeeRepository.save(existingEmployee);
    }

    // Xóa nhân viên theo Employee ID
    public void deleteEmployee(String employeeId) {
        if (!employeeRepository.existsByEmployeeId(employeeId)) {
            throw new RuntimeException("Employee not found with ID: " + employeeId);
        }
        // Xóa nhân viên
        employeeRepository.deleteByEmployeeId(employeeId);
    }

    // Tính lương hàng năm của nhân viên
    public Map<Integer, SalaryDTO> calculateAnnualSalary(String employeeId, int year) {
        Map<Integer, SalaryDTO> monthlySalaries = new HashMap<>();

        // Lặp qua các tháng trong năm và tính lương mỗi tháng
        for (int month = 1; month <= 12; month++) {
            LocalDate startDate = LocalDate.of(year, month, 1); // Ngày bắt đầu tháng
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); // Ngày kết thúc tháng

            // Tính tổng số giờ làm việc trong tháng
            double totalHoursWorked = calculateTotalHoursWorked(employeeId, month, year);

            // Lấy thông tin nhân viên
            Employee employee = employeeRepository.findByEmployeeId(employeeId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            // Tính toán lương cho tháng
            SalaryDTO salaryDTO = getSalaryDTO(employeeId, employee, totalHoursWorked);
            monthlySalaries.put(month, salaryDTO);
        }

        return monthlySalaries;
    }

    public double calculateTotalHoursWorked(String employeeId, int month, int year) {
        // Implement the logic to calculate total hours worked for the given employeeId, month, and year
        List<Attendance> attendances = attendanceService.getAttendancesByEmployee(employeeId, month, year);
        double totalHours = 0;

        for (Attendance attendance : attendances) {
            if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
                Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
                totalHours += duration.toHours();
            }
        }

        return totalHours;
    }

    // Tính toán lương cho từng tháng
    public SalaryDTO getSalaryDTO(String employeeId, Employee employee, double totalHoursWorked) {
        double basicSalary = employee.getBasicSalary().doubleValue();
        double hourlyRate = basicSalary / 40;
        double salary = basicSalary;
        double overtimeSalary = 0;

        if (totalHoursWorked > 40) {
            double overtimeHours = totalHoursWorked - 40;
            overtimeSalary = overtimeHours * hourlyRate * 1.5;
            salary += overtimeSalary;
        }

        SalaryDTO salaryDTO = new SalaryDTO();
        salaryDTO.setEmployeeId(employeeId);
        salaryDTO.setBasicSalary(BigDecimal.valueOf(basicSalary));
        salaryDTO.setOvertimeSalary(BigDecimal.valueOf(overtimeSalary));
        salaryDTO.setTotalSalary(BigDecimal.valueOf(salary));
        return salaryDTO;
    }
}
