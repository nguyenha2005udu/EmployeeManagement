//import React, { useState } from "react";
//
//function Timekeeping() {
//  const [timekeepingData, setTimekeepingData] = useState([
//    {
//      empId: 1,
//      name: "Nguyễn Văn A",
//      date: "2024-11-08",
//      checkin: "08:00",
//      checkout: "17:00",
//    },
//    {
//      empId: 2,
//      name: "Trần Thị B",
//      date: "2024-11-08",
//      checkin: "09:00",
//      checkout: "18:00",
//    },
//    // Thêm các dữ liệu chấm công khác ở đây
//  ]);
//
//  return (
//    <div className="timekeeping">
//      <h2>Chấm công</h2>
//      <table>
//        <thead>
//          <tr>
//            <th>Mã nhân viên</th>
//            <th>Tên</th>
//            <th>Ngày</th>
//            <th>Giờ check-in</th>
//            <th>Giờ check-out</th>
//            <th>Hành động</th>
//          </tr>
//        </thead>
//        <tbody>
//          {timekeepingData.map((record) => (
//            <tr key={record.empId}>
//              <td>{record.empId}</td>
//              <td>{record.name}</td>
//              <td>{record.date}</td>
//              <td>{record.checkin}</td>
//              <td>{record.checkout}</td>
//              <td>
//                <button>Edit</button>
//                <button>Delete</button>
//              </td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//      <button>Thêm giờ làm việc</button>
//    </div>
//  );
//}
//
//export default Timekeeping;
