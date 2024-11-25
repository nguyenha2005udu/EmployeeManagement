//import { departmentsData } from "../utils/mockData";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8386/management/departments/get-all";


export const departmentService = {
  getAllDepartments: async () => {
    const response = await axios.get(API_URL);
        return response.data;
  },

  // ... các phương thức khác
};
