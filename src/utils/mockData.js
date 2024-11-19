//// Dữ liệu mẫu cho Dashboard
//
//export const dashboardData = {
//  totalEmployees: 150,
//
//  totalDepartments: 8,
//
//  presentToday: 142,
//
//  totalSalary: 850000000,
//
//  attendanceStats: {
//    onTime: 120,
//
//    late: 22,
//
//    absent: 8,
//  },
//
//  departmentAttendance: [
//    { department: "IT", rate: 95 },
//
//    { department: "HR", rate: 88 },
//
//    { department: "Marketing", rate: 92 },
//  ],
//
//  newEmployees: [
//    { id: 1, name: "Nguyễn Văn A", department: "IT", joinDate: "2024-03-01" },
//
//    { id: 2, name: "Trần Thị B", department: "HR", joinDate: "2024-03-05" },
//
//    {
//      id: 3,
//      name: "Lê Văn C",
//      department: "Marketing",
//      joinDate: "2024-03-10",
//    },
//  ],
//
//  employeeStats: {
//    male: 90,
//
//    female: 60,
//
//    fulltime: 130,
//
//    parttime: 20,
//  },
//};
//
//// Dữ liệu mẫu cho nhân viên
//
//export const employeesData = [
//  {
//    id: 1,
//
//    code: "NV001",
//
//    fullName: "Nguyễn Văn A",
//
//    email: "nguyenvana@company.com",
//
//    phone: "0901234567",
//
//    department: { id: 1, name: "Phòng IT" },
//
//    position: { id: 1, name: "Senior Developer" },
//
//    status: "active",
//
//    joinDate: "2023-01-15",
//
//    baseSalary: 25000000,
//  },
//
//  {
//    id: 2,
//
//    code: "NV002",
//
//    fullName: "Trần Thị B",
//
//    email: "tranthib@company.com",
//
//    phone: "0901234568",
//
//    department: { id: 2, name: "Phòng HR" },
//
//    position: { id: 2, name: "HR Manager" },
//
//    status: "active",
//
//    joinDate: "2023-02-20",
//
//    baseSalary: 20000000,
//  },
//
//  {
//    id: 3,
//
//    code: "NV003",
//
//    fullName: "Lê Văn C",
//
//    email: "levanc@company.com",
//
//    phone: "0901234569",
//
//    department: { id: 3, name: "Phòng Marketing" },
//
//    position: { id: 3, name: "Marketing Executive" },
//
//    status: "inactive",
//
//    joinDate: "2023-03-10",
//
//    baseSalary: 18000000,
//  },
//
//  {
//    id: 4,
//
//    code: "NV004",
//
//    fullName: "Phạm Thị D",
//
//    email: "phamthid@company.com",
//
//    phone: "0901234570",
//
//    department: { id: 1, name: "Phòng IT" },
//
//    position: { id: 4, name: "Junior Developer" },
//
//    status: "active",
//
//    joinDate: "2023-04-15",
//
//    baseSalary: 15000000,
//  },
//
//  {
//    id: 5,
//
//    code: "NV005",
//
//    fullName: "Hoàng Văn E",
//
//    email: "hoangvane@company.com",
//
//    phone: "0901234571",
//
//    department: { id: 3, name: "Phòng Marketing" },
//
//    position: { id: 5, name: "Content Writer" },
//
//    status: "active",
//
//    joinDate: "2023-05-20",
//
//    baseSalary: 16000000,
//  },
//];
//
//// Dữ liệu mẫu cho phòng ban
//
//export const departmentsData = [
//  {
//    id: 1,
//
//    code: "IT",
//
//    name: "Phòng IT",
//
//    establishedYear: 2020,
//
//    status: true,
//
//    employeeCount: 45,
//
//    manager: { id: 1, name: "Nguyễn Văn A" },
//  },
//
//  {
//    id: 2,
//
//    code: "HR",
//
//    name: "Phòng Nhân sự",
//
//    establishedYear: 2019,
//
//    status: true,
//
//    employeeCount: 15,
//
//    manager: { id: 2, name: "Trần Thị B" },
//  },
//
//  {
//    id: 3,
//
//    code: "MKT",
//
//    name: "Phòng Marketing",
//
//    establishedYear: 2021,
//
//    status: true,
//
//    employeeCount: 30,
//
//    manager: { id: 3, name: "Lê Văn C" },
//  },
//
//  {
//    id: 4,
//
//    code: "FIN",
//
//    name: "Phòng Tài chính",
//
//    establishedYear: 2018,
//
//    status: true,
//
//    employeeCount: 20,
//
//    manager: { id: 4, name: "Phạm Thị D" },
//  },
//];
//
//// Dữ liệu mẫu cho chấm công
//
//export const timesheetsData = [
//  {
//    id: 1,
//
//    employee: {
//      id: 1,
//
//      code: "NV001",
//
//      fullName: "Nguyễn Văn A",
//    },
//
//    date: "2024-03-15",
//
//    checkInTime: "2024-03-15 08:00:00",
//
//    checkOutTime: "2024-03-15 17:30:00",
//
//    status: "present",
//
//    workingHours: 8.5,
//  },
//
//  {
//    id: 2,
//
//    employee: {
//      id: 2,
//
//      code: "NV002",
//
//      fullName: "Trần Thị B",
//    },
//
//    date: "2024-03-15",
//
//    checkInTime: "2024-03-15 08:45:00",
//
//    checkOutTime: "2024-03-15 17:45:00",
//
//    status: "late",
//
//    workingHours: 8,
//  },
//
//  {
//    id: 3,
//
//    employee: {
//      id: 3,
//
//      code: "NV003",
//
//      fullName: "Lê Văn C",
//    },
//
//    date: "2024-03-15",
//
//    checkInTime: null,
//
//    checkOutTime: null,
//
//    status: "absent",
//
//    workingHours: 0,
//  },
//];
//
//// Dữ liệu mẫu cho bảng lương
//
//export const payrollsData = [
//  {
//    id: 1,
//
//    employeeId: "NV001",
//
//    fullName: "Nguyễn Văn A",
//
//    department: "Phòng IT",
//
//    workingDays: 22,
//
//    standardDays: 22,
//
//    baseSalary: 25000000,
//
//    allowance: 3000000,
//
//    overtimeHours: 10,
//
//    overtimePay: 1500000,
//
//    totalSalary: 29500000,
//  },
//
//  {
//    id: 2,
//
//    employeeId: "NV002",
//
//    fullName: "Trần Thị B",
//
//    department: "Phòng HR",
//
//    workingDays: 20,
//
//    standardDays: 22,
//
//    baseSalary: 20000000,
//
//    allowance: 2500000,
//
//    overtimeHours: 5,
//
//    overtimePay: 750000,
//
//    totalSalary: 23250000,
//  },
//
//  {
//    id: 3,
//
//    employeeId: "NV003",
//
//    fullName: "Lê Văn C",
//
//    department: "Phòng Marketing",
//
//    workingDays: 21,
//
//    standardDays: 22,
//
//    baseSalary: 18000000,
//
//    allowance: 2000000,
//
//    overtimeHours: 8,
//
//    overtimePay: 1000000,
//
//    totalSalary: 21000000,
//  },
//];
//
//// Dữ liệu mẫu cho tin nhắn và thông báo
//
//export const messagesData = [
//  {
//    id: 1,
//
//    senderId: 1,
//
//    senderName: "Nguyễn Văn A",
//
//    content: "Xin chào, tôi cần hỗ trợ về vấn đề chấm công",
//
//    time: "2024-03-15 09:00:00",
//
//    read: false,
//  },
//
//  {
//    id: 2,
//
//    senderId: 2,
//
//    senderName: "Trần Thị B",
//
//    content: "Gửi báo cáo dự án tuần này",
//
//    time: "2024-03-15 10:30:00",
//
//    read: true,
//  },
//];
//
//export const notificationsData = [
//  {
//    id: 1,
//
//    title: "Yêu cầu nghỉ phép mới",
//
//    content: "Nhân viên Nguyễn Văn A đã gửi đơn xin nghỉ phép",
//
//    time: "5 phút trước",
//
//    type: "leave_request",
//
//    read: false,
//  },
//
//  {
//    id: 2,
//
//    title: "Nhắc nhở đánh giá",
//
//    content: "Đến hạn đánh giá nhân viên quý I/2024",
//
//    time: "1 giờ trước",
//
//    type: "reminder",
//
//    read: false,
//  },
//
//  {
//    id: 3,
//
//    title: "Chấm công muộn",
//
//    content: "3 nhân viên check-in muộn hôm nay",
//
//    time: "2 giờ trước",
//
//    type: "attendance",
//
//    read: true,
//  },
//];
//
//// Thêm vào file mockData.js
//
//export const positionsData = [
//  {
//    id: 1,
//
//    code: "DEV_SR",
//
//    name: "Senior Developer",
//
//    department: "Phòng IT",
//
//    baseSalary: 25000000,
//
//    allowance: 3000000,
//
//    employeeCount: 5,
//
//    description: "Lập trình viên cao cấp",
//
//    status: true,
//  },
//
//  {
//    id: 2,
//
//    code: "HR_MNG",
//
//    name: "HR Manager",
//
//    department: "Phòng HR",
//
//    baseSalary: 20000000,
//
//    allowance: 2500000,
//
//    employeeCount: 1,
//
//    description: "Quản lý nhân sự",
//
//    status: true,
//  },
//
//  {
//    id: 3,
//
//    code: "MKT_LEAD",
//
//    name: "Marketing Leader",
//
//    department: "Phòng Marketing",
//
//    baseSalary: 18000000,
//
//    allowance: 2000000,
//
//    employeeCount: 2,
//
//    description: "Trưởng nhóm marketing",
//
//    status: true,
//  },
//];
//
//export const overtimeData = [
//  {
//    id: 1,
//
//    employee: {
//      name: "Nguyễn Văn A",
//
//      department: "IT",
//    },
//
//    date: "2024-03-15",
//
//    hours: 2,
//
//    rate: 1.5,
//
//    amount: 300000,
//
//    status: "approved",
//  },
//
//  {
//    id: 2,
//
//    employee: {
//      name: "Tr��n Thị B",
//
//      department: "HR",
//    },
//
//    date: "2024-03-16",
//
//    hours: 3,
//
//    rate: 1.5,
//
//    amount: 450000,
//
//    status: "pending",
//  },
//];
//
//export const allowanceData = [
//  {
//    id: 1,
//
//    employee: {
//      name: "Nguyễn Văn A",
//
//      department: "IT",
//    },
//
//    type: "bonus",
//
//    amount: 5000000,
//
//    reason: "Thưởng dự án",
//
//    date: "2024-03-15",
//
//    status: "approved",
//  },
//
//  {
//    id: 2,
//
//    employee: {
//      name: "Trần Thị B",
//
//      department: "HR",
//    },
//
//    type: "allowance",
//
//    amount: 2000000,
//
//    reason: "Phụ cấp xăng xe",
//
//    date: "2024-03-16",
//
//    status: "pending",
//  },
//];
//
//export const companyData = {
//  name: "Công ty TNHH ABC",
//  taxCode: "0123456789",
//  phone: "0987654321",
//  email: "contact@company.com",
//  website: "www.company.com",
//  address: "Số 123, Đường ABC, Quận XYZ, TP.HCM",
//  workingHours: ["08:00", "17:30"],
//  workingDays: ["1", "2", "3", "4", "5"],
//  description: "Công ty chuyên về phát triển phần mềm và giải pháp công nghệ",
//};
//
//export const usersData = [
//  {
//    id: 1,
//    username: "admin",
//    fullName: "Administrator",
//    email: "admin@company.com",
//    role: "admin",
//    department: "IT",
//    status: true,
//    lastLogin: "2024-03-15 09:00:00",
//  },
//  // ... thêm dữ liệu mẫu khác
//];
//
//export const rolesData = [
//  {
//    id: 1,
//    name: "Admin",
//    description: "Quản trị viên hệ thống",
//    permissions: ["all"],
//    userCount: 2,
//    status: true,
//  },
//  {
//    id: 2,
//    name: "HR Manager",
//    description: "Quản lý nhân sự",
//    permissions: ["employee_view", "employee_edit", "attendance_view"],
//    userCount: 5,
//    status: true,
//  },
//  // ... thêm dữ liệu mẫu khác
//];
