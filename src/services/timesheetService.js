import { timesheetsData } from "../utils/mockData";

export const timesheetService = {
  getAllTimesheets: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timesheetsData);
      }, 1000);
    });
  },

  checkIn: async (employeeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  checkOut: async (timesheetId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  submitLeaveRequest: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Gửi đơn thành công" });
      }, 500);
    });
  },
};
