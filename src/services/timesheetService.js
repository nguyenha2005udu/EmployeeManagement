
import axios from "axios";
import moment from "moment";
const API_URL = "http://localhost:8386/management/attendances";
const currentTime = new Date();
const currentDate = moment(currentTime).format("YYYY-MM-DD");
export const timesheetService = {
  getAllTimesheets: async () => {
    const response = await axios.get(`${API_URL}/get-all`);
    return response.data;
  },

  checkIn: async (id, checkInTime) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      checkIn: checkInTime,
      date: currentDate,

    });
    return response.data;
  },
  checkOut: async (id, checkInTime, checkOutTime) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      checkIn: checkInTime,
      checkOut: checkOutTime,
      date: currentDate,
    });
    return response.data;
  },
};
