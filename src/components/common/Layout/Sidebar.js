import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Badge, Avatar, Button } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  MessageOutlined,
  BellOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "../../../assets/css/Sidebar.css";

const Sidebar = ({ collapsed, isMobile, onCollapse }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = useMemo(() => [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Bảng điều khiển</Link>,
    },
    {
      key: "employee",
      icon: <TeamOutlined />,
      label: "Quản lý nhân sự",
      children: [
        {
          key: "/employees",
          label: <Link to="/admin/employees">Danh sách nhân viên</Link>,
        },
        {
          key: "/positions",
          label: <Link to="/admin/positions">Chức vụ</Link>,
        },
        {
          key: "/departments",
          label: <Link to="/admin/departments">Phòng ban</Link>,
        },
      ],
    },
    {
      key: "attendance",
      icon: <ClockCircleOutlined />,
      label: "Chấm công & Nghỉ phép",
      children: [
        {
          key: "/timekeeping",
          label: <Link to="/admin/timekeeping">Chấm công</Link>,
        },
        {
          key: "/leave-requests",
          label: <Link to="/admin/leave-requests">Đơn xin nghỉ phép</Link>,
        },
        {
          key: "/schedule",
          label: <Link to="/admin/schedule">Lịch làm việc</Link>,
        },
      ],
    },
    {
      key: "payroll",
      icon: <DollarOutlined />,
      label: "Quản lý lương",
      children: [
        {
          key: "/payroll",
          label: <Link to="/admin/payroll">Bảng lương</Link>,
        },
        {
          key: "/overtime",
          label: <Link to="/admin/overtime">Quản lý tăng ca</Link>,
        },
        {
          key: "/allowances",
          label: <Link to="/admin/allowances">Phụ cấp & Thưởng</Link>,
        },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Báo cáo & Thống kê",
      children: [
        {
          key: "/reports/attendance",
          label: <Link to="/admin/reports/attendance">Báo cáo chấm công</Link>,
        },
        {
          key: "/reports/payroll",
          label: <Link to="/admin/reports/payroll">Báo cáo lương</Link>,
        },
        {
          key: "/reports/performance",
          label: <Link to="/admin/reports/performance">Đánh giá nhân viên</Link>,
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống",
      children: [
        {
          key: "/settings/users",
          label: <Link to="/admin/settings/users">Quản lý người dùng</Link>,
        },
        {
          key: "/settings/roles",
          label: <Link to="/admin/settings/roles">Phân quyền</Link>,
        },
      ],
    },
    {
      key: "inbox",
      icon: <MessageOutlined />,
      label: "Tin nhắn & Thông báo",
      children: [
        {
          key: "/inbox",
          label: "Hộp thư",
          icon: (
            <Badge count={3}>
              <MessageOutlined />
            </Badge>
          ),
        },
        {
          key: "/notifications",
          label: "Thông báo đã gửi",
          icon: <BellOutlined />,
        },
      ],
    },
  ], []);

  return (
    <>
      {isMobile && (
        <div
          className={`sidebar-overlay ${!collapsed ? "visible" : ""}`}
          onClick={onCollapse}
        />
      )}
      <div
        className={`sidebar-container ${
          !collapsed || !isMobile ? "visible" : ""
        }`}
      >
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={onCollapse}
              className="mobile-close-btn"
            />
          )}

          <div className={`user-profile ${collapsed ? "collapsed" : ""}`}>
            <Avatar
              icon={<UserOutlined />}
              className="user-avatar"
              size={collapsed ? 32 : 40}
            />
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">Admin</div>
                <div className="user-role">System Administrator</div>
              </div>
            )}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPath]}
            defaultOpenKeys={["employee", "attendance", "payroll", "reports"]}
            items={menuItems}
            className="sidebar-menu"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Sidebar);
