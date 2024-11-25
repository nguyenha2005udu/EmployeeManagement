
import axios from "axios";

const API_URL = "http://localhost:8386/management/attendances";

export const timesheetService = {
  getAllTimesheets: async () => {
    const response = await axios.get(`${API_URL}/get-all`);
    return response.data;
  },

  checkIn: async (id, checkInTime) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      checkIn: checkInTime,
      date: new Date().toISOString().split("T")[0],

    });
    return response.data;
  },
  checkOut: async (id, checkInTime, checkOutTime) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      checkIn: checkInTime,
      checkOut: checkOutTime,
      date: new Date().toISOString().split("T")[0],
    });
    return response.data;
  },
};
