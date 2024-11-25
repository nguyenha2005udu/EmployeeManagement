import axios from "axios";

const API_URL = "http://localhost:8386/management/employees/get-all";

export const employeeService = {
  getAllEmployees: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getEmployeeById: async (id) => {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    },

//  createEmployee: async (data) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      const newEmployee = {
//        id: mockEmployees.length + 1,
//        ...data,
//      };
//      setTimeout(() => {
//        resolve(newEmployee);
//      }, 500);
//    });
//  },

//  updateEmployee: async (id, data) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      const updatedEmployee = { id, ...data };
//      setTimeout(() => {
//        resolve(updatedEmployee);
//      }, 500);
//    });
//  },
//
//  deleteEmployee: async (id) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true });
//      }, 500);
//    });
//  },

//  getEmployeesByDepartment: async (departmentId) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      const filteredEmployees = mockEmployees.filter(
//        (emp) => emp.department.id === departmentId
//      );
//      setTimeout(() => {
//        resolve(filteredEmployees);
//      }, 500);
//    });
//  },
//
//  importEmployees: async (file) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true, message: "Import thành công" });
//      }, 1000);
//    });
//  },
//
//  exportEmployees: async (filters) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve(new Blob(["Export data"], { type: "text/csv" }));
//      }, 1000);
//    });
//  },
//
//  filterEmployees: async (filters) => {
//    // Giả lập API call
//    return new Promise((resolve) => {
//      const filteredEmployees = mockEmployees.filter((emp) => {
//        // Thêm logic lọc theo filters
//        return true;
//      });
//      setTimeout(() => {
//        resolve(filteredEmployees);
//      }, 500);
//    });
//  },
};
