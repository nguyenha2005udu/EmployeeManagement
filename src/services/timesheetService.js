
import axios from "axios";

const API_URL = "http://localhost:8080/user-management/attendances/get-all";

export const timesheetService = {
  getAllTimesheets: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
}

