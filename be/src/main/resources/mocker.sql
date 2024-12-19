USE employee_management;

-- Xóa dữ liệu cũ
DELETE FROM attendance;
DELETE FROM employee;
DELETE FROM position;
DELETE FROM department;

-- Tắt auto increment
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE department AUTO_INCREMENT = 1;
ALTER TABLE position AUTO_INCREMENT = 1;
ALTER TABLE employee AUTO_INCREMENT = 1;
ALTER TABLE attendance AUTO_INCREMENT = 1;
SET FOREIGN_KEY_CHECKS = 1;

USE employee_management;


-- Dữ liệu cho bảng department
INSERT INTO department (department_name, department_code, founding_year, status) VALUES
('Phòng Hành Chính', 'PHC', 2005, 1),
('Phòng Kỹ Thuật', 'PKT', 2010, 1),
('Phòng Tài Chính', 'PTC', 2008, 1),
('Phòng Nhân Sự', 'PNS', 2009, 1),
('Phòng Marketing', 'PMK', 2012, 1),
('Phòng Bán Hàng', 'PBH', 2013, 1),
('Phòng IT', 'PI', 2011, 1),
('Phòng Dự Án', 'PDA', 2014, 1),
('Phòng Pháp Chế', 'PPC', 2016, 1),
('Phòng Nghiên Cứu', 'PNC', 2017, 1);

-- Dữ liệu cho bảng positions
INSERT INTO positions (position_name, position_code,status) VALUES
('Trưởng Phòng', 'TP',1),
('Phó Phòng', 'PP',1),
('Nhân Viên ', 'NV',1),
('Kế Toán Trưởng', 'KTT',1),
('Thực tập Sinh', 'TTS',1),
('Chuyên viên', 'CV',1),
('Kỹ sư', 'KS',1);

-- Dữ liệu cho bảng department_position
INSERT INTO department_position (department_id, position_id) VALUES
(1, 1),
(2, 1), 
(3, 1),   
(4, 1), 
(5, 1), 
(6, 1), 
(7, 1), 
(8, 1), 
(9, 1), 
(10, 1), 
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3),
(8, 3),
(9, 3),
(10, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(6, 4),
(7, 4),
(8, 4),
(9, 4),
(10, 4),
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 5),
(9, 5),
(10, 5),
(2, 6),
(3, 6),
(5, 6),
(6, 6),
(7, 6),
(8, 6),
(10, 6),
(2, 7),
(7, 7),
(8, 7),
(10, 7);




 

INSERT INTO employee (name, dob, phone, address, gender, hire_date, department_id, position_id, basic_salary, email,status) VALUES
('Nguyễn Văn A', '1990-01-01', '0123456789', 'Hà Nội', 'Nam', '2020-01-15', 1, 1, 15000.00, 'a.nguyen@example.com',1),
('Trần Thị B', '1992-02-02', '0987654321', 'Hà Nội', 'Nữ', '2021-03-20', 2, 3, 12000.00, 'b.tran@example.com',1),
('Lê Văn C', '1988-03-03', '0912345678', 'Hồ Chí Minh', 'Nam', '2019-05-10', 3, 3, 13000.00, 'c.le@example.com',1),
('Phạm Thị D', '1995-04-04', '0934567890', 'Đà Nẵng', 'Nữ', '2022-07-25', 4, 4, 11000.00, 'd.pham@example.com',1),
('Nguyễn Văn E', '1985-05-05', '0945678901', 'Hà Nội', 'Nam', '2018-06-30', 5, 6, 16000.00, 'e.nguyen@example.com',1),
('Trần Văn F', '1993-06-06', '0956789012', 'Hồ Chí Minh', 'Nam', '2020-08-15', 6, 3, 11500.00, 'f.tran@example.com',1),
('Lê Thị G', '1991-07-07', '0967890123', 'Đà Nẵng', 'Nữ', '2021-09-10', 7, 5, 14000.00, 'g.le@example.com',1),
('Nguyễn Văn H', '1989-08-08', '0978901234', 'Hà Nội', 'Nam', '2017-10-20', 8, 7, 15500.00, 'h.nguyen@example.com',1),
('Trần Thị I', '1994-09-09', '0989012345', 'Hồ Chí Minh', 'Nữ', '2022-11-30', 9, 3, 12500.00, 'i.tran@example.com',1),
('Phạm Văn J', '1987-10-10', '0990123456', 'Đà Nẵng', 'Nam', '2020-12-15', 10, 2, 17000.00, 'j.pham@example.com',1),
('Nguyễn Văn K', '1990-01-11', '0123456780', 'Hà Nội', 'Nam', '2021-01-01', 1, 1, 15000.00, 'k.nguyen@example.com',1),
('Trần Thị L', '1992-02-12', '0987654322', 'Hà Nội', 'Nữ', '2021-02-02', 2, 3, 12000.00, 'l.tran@example.com',1),
('Lê Văn M', '1988-03-13', '0912345679', 'Hồ Chí Minh', 'Nam', '2019-03-03', 3, 3, 13000.00, 'm.le@example.com',1),
('Phạm Thị N', '1995-04-14', '0934567891', 'Đà Nẵng', 'Nữ', '2022-04-04', 4, 4, 11000.00, 'n.pham@example.com',1),
('Nguyễn Văn O', '1985-05-15', '0945678902', 'Hà Nội', 'Nam', '2018-05-05', 5, 6, 16000.00, 'o.nguyen@example.com',1),
('Trần Văn P', '1993-06-16', '0956789013', 'Hồ Chí Minh', 'Nam', '2020-06-06', 6, 3, 11500.00, 'p.tran@example.com',1),
('Lê Thị Q', '1991-07-17', '0967890124', 'Đà Nẵng', 'Nữ', '2021-07-07', 7, 5, 14000.00, 'q.le@example.com',1),
('Nguyễn Văn R', '1989-08-18', '0978901235', 'Hà Nội', 'Nam', '2017-08-08', 8, 7, 15500.00, 'r.nguyen@example.com',1),
('Trần Thị S', '1994-09-19', '0989012346', 'Hồ Chí Minh', 'Nữ', '2022-09-09', 9, 3, 12500.00, 's.tran@example.com',1),
('Phạm Văn T', '1987-10-20', '0990123457', 'Đà Nẵng', 'Nam', '2020-10-10', 10, 2, 17000.00, 't.pham@example.com',1),
('Nguyễn Văn U', '1990-01-21', '0123456781', 'Hà Nội', 'Nam', '2021-01-11', 1, 1, 15000.00, 'u.nguyen@example.com',1),
('Trần Thị V', '1992-02-22', '0987654323', 'Hà Nội', 'Nữ', '2021-02-12', 2, 3, 12000.00, 'v.tran@example.com',1),
('Lê Văn W', '1988-03-23', '0912345680', 'Hồ Chí Minh', 'Nam', '2019-03-13', 3, 3, 13000.00, 'w.le@example.com',1),
('Phạm Thị X', '1995-04-24', '0934567892', 'Đà Nẵng', 'Nữ', '2022-04-14', 4, 4, 11000.00, 'x.pham@example.com',1),
('Nguyễn Văn Y', '1985-05-25', '0945678903', 'Hà Nội', 'Nam', '2018-05-25', 5, 6, 16000.00, 'y.nguyen@example.com',1),
('Trần Văn Z', '1993-06-26', '0956789014', 'Hồ Chí Minh', 'Nam', '2020-06-16', 6, 3, 11500.00, 'z.tran@example.com',1),
('Lê Thị AA', '1991-07-27', '0967890125', 'Đà Nẵng', 'Nữ', '2021-07-17', 7, 5, 14000.00, 'aa.le@example.com',1),
('Nguyễn Văn BB', '1989-08-28', '0978901236', 'Hà Nội', 'Nam', '2017-08-18', 8, 7, 15500.00, 'bb.nguyen@example.com',1),
('Trần Thị CC', '1994-09-29', '0989012347', 'Hồ Chí Minh', 'Nữ', '2022-09-19', 9, 3, 12500.00, 'cc.tran@example.com',1),
('Phạm Văn DD', '1987-10-30', '0990123458', 'Đà Nẵng', 'Nam', '2020-10-20', 10, 2, 17000.00, 'dd.pham@example.com',1),
('Nguyễn Văn EE', '1990-01-31', '0123456782', 'Hà Nội', 'Nam', '2021-01-21', 1, 1, 15000.00, 'ee.nguyen@example.com',1),
('Trần Thị FF', '1992-02-01', '0987654324', 'Hà Nội', 'Nữ', '2021-02-02', 2, 3, 12000.00, 'ff.tran@example.com',1),
('Lê Văn GG', '1988-03-02', '0912345681', 'Hồ Chí Minh', 'Nam', '2019-03-03', 3, 3, 13000.00, 'gg.le@example.com',1),
('Phạm Thị HH', '1995-04-03', '0934567893', 'Đà Nẵng', 'Nữ', '2022-04-04', 4, 4, 11000.00, 'hh.pham@example.com',1),
('Nguyễn Văn II', '1985-05-04', '0945678904', 'Hà Nội', 'Nam', '2018-05-05', 5, 6, 16000.00, 'ii.nguyen@example.com',1),
('Trần Văn JJ', '1993-06-05', '0956789015', 'Hồ Chí Minh', 'Nam', '2020-06-06', 6, 3, 11500.00, 'jj.tran@example.com',1),
('Lê Thị KK', '1991-07-06', '0967890126', 'Đà Nẵng', 'Nữ', '2021-07-07', 7, 5, 14000.00, 'kk.le@example.com',1),
('Nguyễn Văn LL', '1989-08-07', '0978901237', 'Hà Nội', 'Nam', '2017-08-08', 8, 7, 15500.00, 'll.nguyen@example.com',1),
('Trần Thị MM', '1994-09-08', '0989012348', 'Hồ Chí Minh', 'Nữ', '2022-09-09', 9, 3, 12500.00, 'mm.tran@example.com',1),
('Phạm Văn NN', '1987-10-09', '0990123459', 'Đà Nẵng', 'Nam', '2020-10-10', 10, 2, 17000.00, 'nn.pham@example.com',1);





-- Dữ liệu cho bảng attendance
INSERT INTO attendance (employee_id, check_in, check_out, work_duration, date, status, note) VALUES
(1, '2024-01-01 08:00:00', '2024-01-01 17:00:00', 8.0, '2024-01-01', 'Có mặt', NULL),
(2, '2024-01-01 08:15:00', '2024-01-01 17:15:00', 8.0, '2024-01-01', 'Muộn', 'Muộn 15 phút'),
(3, '2024-01-01 08:00:00', '2024-01-01 16:30:00', 7.5, '2024-01-01', 'Có mặt', NULL),
(4, '2024-01-01 09:00:00', '2024-01-01 17:00:00', 7.0, '2024-01-01', 'Muộn', 'Muộn 1 giờ'),
(5, NULL, NULL, NULL, '2024-01-01', 'Vắng', 'Nghỉ phép'),
(6, '2024-01-01 08:30:00', '2024-01-01 17:30:00', 8.0, '2024-01-01', 'Muộn', 'Muộn 30 phút'),
(7, '2024-01-01 08:00:00', '2024-01-01 17:00:00', 8.0, '2024-01-01', 'Có mặt', NULL),
(8, NULL, NULL, NULL, '2024-01-01', 'Vắng', 'Nghỉ không lý do'),
(9, '2024-01-01 08:00:00', '2024-01-01 16:00:00', 8.0, '2024-01-01', 'Có mặt', NULL),
(10, '2024-01-01 08:45:00', '2024-01-01 17:45:00', 8.0, '2024-01-01', 'Muộn', 'Muộn 45 phút');

-- Dữ liệu cho bảng salaries
INSERT INTO salaries (employee_id, month, year, total_working_hours, overtime_hours, basic_salary, overtime_salary, total_salary)
VALUES
(1, 1, 2024, 160.0, 10.0, 15000000, 2000000, 17000000),
(2, 1, 2024, 150.0, 5.0, 12000000, 1000000, 13000000),
(3, 1, 2024, 155.0, 8.0, 10000000, 1600000, 11600000),
(4, 1, 2024, 140.0, 6.0, 14000000, 1200000, 15200000),
(5, 1, 2024, 0, 0, 9000000, 0, 9000000),
(6, 1, 2024, 160.0, 15.0, 11000000, 3000000, 14000000),
(7, 1, 2024, 165.0, 12.0, 13000000, 2400000, 15400000),
(8, 1, 2024, 0, 0, 8000000, 0, 8000000),
(9, 1, 2024, 160.0, 10.0, 10000000, 2000000, 12000000),
(10, 1, 2024, 150.0, 5.0, 12000000, 1000000, 13000000);

-- Thêm dữ liệu vào bảng yearly_reports
INSERT INTO yearly_reports (employee_id, year, total_income)
VALUES
(1, 2024, 150000000),
(2, 2024, 190000000),
(3, 2024, 99000000),
(4, 2024, 108000000),
(5, 2024, 124800000),
(6, 2024, 151200000),
(7, 2024, 104400000),
(8, 2024, 186000000),
(9, 2024, 123600000),
(10, 2024, 100800000);