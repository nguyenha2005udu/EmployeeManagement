import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// Mock data
const mockEmployees = [
  {
    id: 1,
    code: "NV001",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    phone: "0901234567",
    department: { id: 1, name: "Phòng IT" },
    position: { id: 1, name: "Developer" },
    status: "active",
    joinDate: "2023-01-15",
    baseSalary: 15000000,
  },
  // ... thêm dữ liệu mẫu khác
];

export const employeeService = {
  getAllEmployees: async () => {
    // Sử dụng dữ liệu mẫu thay vì gọi API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEmployees);
      }, 1000);
    });
  },

  getEmployeeById: async (id) => {
    // Giả lập API call
    return new Promise((resolve) => {
      const employee = mockEmployees.find((emp) => emp.id === id);
      setTimeout(() => {
        resolve(employee);
      }, 500);
    });
  },

  createEmployee: async (data) => {
    // Giả lập API call
    return new Promise((resolve) => {
      const newEmployee = {
        id: mockEmployees.length + 1,
        ...data,
      };
      setTimeout(() => {
        resolve(newEmployee);
      }, 500);
    });
  },

  updateEmployee: async (id, data) => {
    // Giả lập API call
    return new Promise((resolve) => {
      const updatedEmployee = { id, ...data };
      setTimeout(() => {
        resolve(updatedEmployee);
      }, 500);
    });
  },

  deleteEmployee: async (id) => {
    // Giả lập API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  getEmployeesByDepartment: async (departmentId) => {
    // Giả lập API call
    return new Promise((resolve) => {
      const filteredEmployees = mockEmployees.filter(
        (emp) => emp.department.id === departmentId
      );
      setTimeout(() => {
        resolve(filteredEmployees);
      }, 500);
    });
  },

  importEmployees: async (file) => {
    // Giả lập API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Import thành công" });
      }, 1000);
    });
  },

  exportEmployees: async (filters) => {
    // Giả lập API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Blob(["Export data"], { type: "text/csv" }));
      }, 1000);
    });
  },

  filterEmployees: async (filters) => {
    // Giả lập API call
    return new Promise((resolve) => {
      const filteredEmployees = mockEmployees.filter((emp) => {
        // Thêm logic lọc theo filters
        return true;
      });
      setTimeout(() => {
        resolve(filteredEmployees);
      }, 500);
    });
  },
};
