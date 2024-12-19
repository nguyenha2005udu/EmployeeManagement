CREATE DATABASE IF NOT EXISTS `employee_management`;
USE employee_management;

-- Xóa các bảng nếu tồn tại
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS salaries;
DROP TABLE IF EXISTS yearly_reports;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department_position;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS department;

-- Tạo bảng departments
CREATE TABLE department (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(10) NOT NULL UNIQUE,
    founding_year INT,
    status TINYINT(1) DEFAULT 1
    
);

-- Tạo bảng positions
CREATE TABLE positions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL,
    position_code VARCHAR(10) NOT NULL UNIQUE,
    status TINYINT(1) DEFAULT 1

);

-- Tạo bảng trung gian department_position (mối quan hệ nhiều-nhiều)
CREATE TABLE department_position (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    department_id BIGINT,
    position_id BIGINT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE CASCADE
);

-- Tạo bảng employees
CREATE TABLE employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    address TEXT,
    gender ENUM('Nam', 'Nữ', 'Khác') DEFAULT 'Khác',
    hire_date DATE NOT NULL,
    department_id BIGINT,
    position_id BIGINT,
    basic_salary DECIMAL(10,2) NOT NULL,
    email VARCHAR(100) UNIQUE,
    status TINYINT(1) DEFAULT 1,
    joinorder BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES department(id),
    FOREIGN KEY (position_id) REFERENCES positions(id)
);

-- Tạo bảng attendance
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    check_in DATETIME,
    check_out DATETIME  ,
    work_duration DECIMAL(5,2),
    date DATE NOT NULL,
    status ENUM('Có mặt', 'Vắng', 'Muộn') DEFAULT 'Có mặt',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- lưu thông tin tính lương nhân viên mỗi tháng
CREATE TABLE salaries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    month INT NOT NULL, -- Tháng
    year INT NOT NULL, -- Năm
    total_working_hours DECIMAL(5,2), -- Tổng số giờ làm việc
    overtime_hours DECIMAL(5,2), -- Số giờ làm thêm
    basic_salary DECIMAL(10,2), -- Lương cơ bản
    overtime_salary DECIMAL(10,2), -- Lương làm thêm
    total_salary DECIMAL(10,2), -- Tổng lương
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- Thống kê tổng thu nhập theo năm
CREATE TABLE yearly_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    year INT NOT NULL,
    total_income DECIMAL(15,2), -- Tổng thu nhập trong năm
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- Tạo trigger tự động tạo mã nhân viên
DELIMITER $$

CREATE TRIGGER generate_employee_id
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    DECLARE dep_code VARCHAR(10);
    DECLARE pos_code VARCHAR(10);
    DECLARE join_order BIGINT;

    -- Lấy mã phòng ban từ bảng department
    SELECT department_code 
    INTO dep_code
    FROM department
    WHERE id = NEW.department_id;

    -- Lấy mã chức vụ từ bảng position
    SELECT position_code 
    INTO pos_code
    FROM positions
    WHERE id = NEW.position_id;

    -- Tính số thứ tự vào công ty
    SELECT COALESCE(MAX(joinorder), 0) + 1
    INTO join_order
    FROM employee;

    -- Gán joinorder vào trường của employee
    SET NEW.joinorder = join_order;

    -- Tạo mã nhân viên
    SET NEW.employee_id = CONCAT(dep_code, pos_code, LPAD(join_order, 4, '0'));
END$$

DELIMITER ;
