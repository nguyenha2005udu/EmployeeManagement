import React, { useState } from "react";

function Payroll() {
  const [payrollData, setPayrollData] = useState([
    {
      empId: 1,
      name: "Nguyễn Văn A",
      baseSalary: 10000,
      overtimeHours: 10,
      totalSalary: 12000,
    },
    {
      empId: 2,
      name: "Trần Thị B",
      baseSalary: 15000,
      overtimeHours: 5,
      totalSalary: 15500,
    },
    // Thêm các dữ liệu lương khác ở đây
  ]);

  return (
    <div className="payroll">
      <h2>Tính lương</h2>
      <table>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Tên</th>
            <th>Lương cơ bản</th>
            <th>Số giờ làm thêm</th>
            <th>Lương tổng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.baseSalary}</td>
              <td>{emp.overtimeHours}</td>
              <td>{emp.totalSalary}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Tính lương</button>
    </div>
  );
}

export default Payroll;
