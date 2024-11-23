

export const timesheetService = {
  getAllTimesheets: async () => {
    return await fetch('/attendances/get-all').then((res) => res.json());
  },
  checkIn: async (employeeId, time) => {
    // Gửi yêu cầu check-in
    return await fetch(`/attendances/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, checkIn: time }),
    });
  },
  checkOut: async (timesheetId, time) => {
    // Gửi yêu cầu check-out
    return await fetch(`/attendances/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timesheetId, checkOut: time }),
    });
  },
};

//  submitLeaveRequest: async (data) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true, message: "Gửi đơn thành công" });
//      }, 500);
//    });
//  },
//};
