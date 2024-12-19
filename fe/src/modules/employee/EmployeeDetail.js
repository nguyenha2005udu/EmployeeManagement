import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Spin, message } from "antd";
import axios from "axios";

const EmployeeDetail = () => {
  const { employeeId } = useParams(); // Lấy employeeId từ URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-management/employees/${employeeId}`
        );
        setEmployee(response.data);
      } catch (error) {
        message.error("Không thể tải thông tin chi tiết nhân viên");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [employeeId]);

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (!employee) {
    return <div>Không tìm thấy thông tin nhân viên.</div>;
  }

  return (
    <Card title="Thông tin chi tiết nhân viên">
      <Descriptions bordered>
        <Descriptions.Item label="Mã nhân viên">
          {employee.employeeId}
        </Descriptions.Item>
        <Descriptions.Item label="Tên">{employee.name}</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">{employee.dob}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {employee.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {employee.address}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {employee.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vào làm">
          {employee.hireDate}
        </Descriptions.Item>
        <Descriptions.Item label="Lương cơ bản">
          {employee.basicSalary}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
        <Descriptions.Item label="Phòng ban">
          {employee.department?.departmentName}
        </Descriptions.Item>
        <Descriptions.Item label="Chức vụ">
          {employee.position?.positionName}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default EmployeeDetail;
