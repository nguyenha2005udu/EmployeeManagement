import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout/Layout";

// Import các components từ modules
import LoginEmail from "../modules/login/LoginEmail";
// import ForgotPassword from "../modules/login/ForgotPassword";
import Dashboard from "../modules/dashboard/Dashboard";
import DashboardEmployees from "../modules/dashboard/DashboardEmployees";
import EmployeeList from "../modules/employee/EmployeeList";
import EmployeeDetail from "../modules/employee/EmployeeDetail";
import PayrollList from "../modules/payroll/PayrollList";
import OvertimeList from "../modules/payroll/OvertimeList";
import AllowanceList from "../modules/payroll/AllowanceList";
import LeaveRequestList from "../modules/leave/LeaveRequestList";
import DepartmentList from "../modules/department/DepartmentList";
import DepartmentForm from "../modules/department/DepartmentForm.js";
import TimesheetList from "../modules/timesheet/TimesheetList";
import PositionList from "../modules/position/PositionList";
import ScheduleList from "../modules/timesheet/ScheduleList";
import DepartmentPositions from "../modules/department-position/DepartmentPosition";
// Import Settings components
import UserManagement from "../modules/settings/UserManagement";
import RoleManagement from "../modules/settings/RoleManagement";
import PayrollEmployee from "../modules/payroll/PayrollEmployee";
// Import Reports components
import ReportList from "../modules/reports/ReportList";
import AttendanceReport from "../modules/reports/AttendanceReport";
import PayrollReport from "../modules/reports/PayrollReport";
import PerformanceReport from "../modules/reports/PerformanceReport";

// Import Inbox component
import InboxList from "../modules/inbox/InboxList";

// Import services
import { employeeService } from "../services/employeeService";
import { departmentService } from "../services/departmentService";
import { positionService } from "../services/positionService";
import { timesheetService } from "../services/timesheetService";
import { messageService } from "../services/messageService";
import { settingsService } from "../services/settingsService";

// Import utils
import { routes } from "../utils/constants";
import { dateUtils } from "../utils/dateUtils";
import { isValidDate } from "../utils/validate";

const AdminRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const isAdminRoute = location.pathname.includes("admin");

  return (
    isAdminRoute ? (
      <Layout>
        <Routes>
          <Route path="/" element={<LoginEmail />} />
          {/* Dashboard */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/user/:employeeId" element={<DashboardEmployees />} />
          <Route path="/user/:employeeId/payroll" element={<PayrollEmployee />} />
          {/* Quản lý nhân sự */}
          <Route
            path="/admin/employees"
            element={<EmployeeList service={employeeService} />}
          />
          <Route
            path="/admin/employees/:employeeId"
            element={<EmployeeDetail service={employeeService} />}
          />
          <Route
            path="/admin/departments"
            element={<DepartmentList service={departmentService} />}
          />
          <Route
            path="/admin/departments/add"
            element={<DepartmentForm service={departmentService} />}
          />
          <Route
            path="/admin/departments/edit/:id"
            element={<DepartmentForm service={departmentService} />}
          />
          <Route
            path="/admin/positions"
            element={<PositionList service={positionService} />}
          />
          <Route
            path="/admin/department-positions"
            element={<DepartmentPositions />}
          />
          {/* Chấm công & nghỉ phép */}
          <Route
            path="/admin/timekeeping"
            element={
              <TimesheetList
                service={timesheetService}
                dateUtils={dateUtils}
                isValidDate={isValidDate}
              />
            }
          />
          <Route
            path="/admin/leave-requests"
            element={
              <LeaveRequestList
                service={timesheetService}
                dateUtils={dateUtils}
              />
            }
          />
          <Route
            path="/admin/schedule"
            element={
              <ScheduleList
                service={timesheetService}
                dateUtils={dateUtils}
                isValidDate={isValidDate}
              />
            }
          />
          {/* Quản lý lương */}
          <Route path="/admin/payroll" element={<PayrollList />} />
          <Route path="/admin/department-positions" element={<DepartmentPositions />} />
          <Route path="/admin/overtime" element={<OvertimeList />} />
          <Route path="/admin/allowances" element={<AllowanceList />} />
          {/* Báo cáo */}
          <Route path="/admin/reports" element={<ReportList />} />
          <Route path="/admin/reports/attendance" element={<AttendanceReport />} />
          <Route path="/admin/reports/payroll" element={<PayrollReport />} />
          <Route path="/admin/reports/performance" element={<PerformanceReport />} />
          {/* Cài đặt */}
          <Route
            path="/admin/settings/users"
            element={<UserManagement service={settingsService} />}
          />
          <Route
            path="/admin/settings/roles"
            element={<RoleManagement service={settingsService} />}
          />
          {/* Khác */}
          <Route path="/admin/inbox" element={<InboxList service={messageService} />} />
        </Routes>
      </Layout>
    ) : (
      
        <Routes>
          <Route path="/" element={<LoginEmail />} />
          <Route path="/user/:employeeId" element={<DashboardEmployees />} />
          <Route path="/user/:employeeId/payroll" element={<PayrollEmployee />} />
        </Routes>
      
    )
  );
};

export default AdminRoutes;
