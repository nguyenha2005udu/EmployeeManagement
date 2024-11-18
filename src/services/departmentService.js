import { departmentsData } from "../utils/mockData";

export const departmentService = {
  getAllDepartments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(departmentsData);
      }, 1000);
    });
  },

  // ... các phương thức khác
};
