import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";

// Import các components từ modules
import Dashboard from "./modules/dashboard/Dashboard";
import EmployeeList from "./modules/employee/EmployeeList";
import EmployeeDetail from "./modules/employee/EmployeeDetail";
import PayrollList from "./modules/payroll/PayrollList";
import OvertimeList from "./modules/payroll/OvertimeList";
import AllowanceList from "./modules/payroll/AllowanceList";
import LeaveRequestList from "./modules/leave/LeaveRequestList";
import DepartmentList from "./modules/department/DepartmentList";
import DepartmentForm from "./modules/department/DepartmentForm.js";
import TimesheetList from "./modules/timesheet/TimesheetList";
import PositionList from "./modules/position/PositionList";
import ScheduleList from "./modules/timesheet/ScheduleList";

// Import Settings components
import UserManagement from "./modules/settings/UserManagement";
import RoleManagement from "./modules/settings/RoleManagement";

// Import Reports components
import ReportList from "./modules/reports/ReportList";
import AttendanceReport from "./modules/reports/AttendanceReport";
import PayrollReport from "./modules/reports/PayrollReport";
import PerformanceReport from "./modules/reports/PerformanceReport";

// Import Inbox component
import InboxList from "./modules/inbox/InboxList";

// Import services
import { employeeService } from "./services/employeeService";
import { departmentService } from "./services/departmentService";
import { positionService } from "./services/positionService";
import { timesheetService } from "./services/timesheetService";
import { messageService } from "./services/messageService";
import { settingsService } from "./services/settingsService";

// Import utils
import { routes } from "./utils/constants";
import { dateUtils } from "./utils/dateUtils";
import { isValidDate } from "./utils/validate";

const App = () => {
  // Kiểm tra route hợp lệ
  const validRoutes = routes.filter((route) => {
    return route.path && typeof route.path === "string";
  });

  return (
    <Router>
      <Layout routes={validRoutes}>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Quản lý nhân sự */}
          <Route
            path="/employees"
            element={<EmployeeList service={employeeService} />}
          />
          <Route
            path="/employees/:employeeId"
            element={<EmployeeDetail service={employeeService} />}
          />
          <Route
            path="/departments"
            element={<DepartmentList service={departmentService} />}
          />
          <Route
            path="/departments/add"
            element={<DepartmentForm service={departmentService} />}
          />
          <Route
            path="/departments/edit/:id"
            element={<DepartmentForm service={departmentService} />}
          />
          <Route
            path="/positions"
            element={<PositionList service={positionService} />}
          />

          {/* Chấm công & nghỉ phép */}
          <Route
            path="/timekeeping"
            element={
              <TimesheetList
                service={timesheetService}
                dateUtils={dateUtils}
                isValidDate={isValidDate}
              />
            }
          />
          <Route
            path="/leave-requests"
            element={
              <LeaveRequestList
                service={timesheetService}
                dateUtils={dateUtils}
              />
            }
          />
          <Route
            path="/schedule"
            element={
              <ScheduleList
                service={timesheetService}
                dateUtils={dateUtils}
                isValidDate={isValidDate}
              />
            }
          />

          {/* Quản lý lương */}
          <Route path="/payroll" element={<PayrollList />} />
          <Route path="/overtime" element={<OvertimeList />} />
          <Route path="/allowances" element={<AllowanceList />} />

          {/* Báo cáo */}
          <Route path="/reports" element={<ReportList />} />
          <Route path="/reports/attendance" element={<AttendanceReport />} />
          <Route path="/reports/payroll" element={<PayrollReport />} />
          <Route path="/reports/performance" element={<PerformanceReport />} />

          {/* Cài đặt */}
          <Route
            path="/settings/users"
            element={<UserManagement service={settingsService} />}
          />
          <Route
            path="/settings/roles"
            element={<RoleManagement service={settingsService} />}
          />

          {/* Khác */}
          <Route
            path="/inbox"
            element={<InboxList service={messageService} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
