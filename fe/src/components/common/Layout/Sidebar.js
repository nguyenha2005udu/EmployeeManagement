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
      label: <Link to="/">Bảng Điều Khiển</Link>,
    },
    {
      key: "employee",
      icon: <TeamOutlined />,
      label: "Quản Lý Nhân Sự",
      children: [
        {
          key: "/employees",
          label: <Link to="/employees">Danh Sách Nhân Viên</Link>,
        },
        {
          key: "/positions",
          label: <Link to="/positions">Chức Vụ</Link>,
        },
        {
          key: "/departments",
          label: <Link to="/departments">Phòng Ban</Link>,
        },
      ],
    },
    {
      key: "attendance",
      icon: <ClockCircleOutlined />,
      label: "Chấm Công & Nghỉ Phép",
      children: [
        {
          key: "/timekeeping",
          label: <Link to="/timekeeping">Chấm Công</Link>,
        },
        {
          key: "/leave-requests",
          label: <Link to="/leave-requests">Đơn Xin Nghỉ Phép</Link>,
        },
        {
          key: "/schedule",
          label: <Link to="/schedule">Lịch Làm Việc</Link>,
        },
      ],
    },
    {
      key: "payroll",
      icon: <DollarOutlined />,
      label: "Quản Lý Lương",
      children: [
        {
          key: "/payroll",
          label: <Link to="/payroll">Bảng Lương</Link>,
        },
        {
          key: "/overtime",
          label: <Link to="/overtime">Quản Lý Tăng Ca</Link>,
        },
        {
          key: "/allowances",
          label: <Link to="/allowances">Phụ Cấp & Thưởng</Link>,
        },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Báo Cáo & Thống Kê",
      children: [
        {
          key: "/reports/attendance",
          label: <Link to="/reports/attendance">Báo Cáo Chấm Công</Link>,
        },
        {
          key: "/reports/payroll",
          label: <Link to="/reports/payroll">Báo Cáo Lương</Link>,
        },
        {
          key: "/reports/performance",
          label: <Link to="/reports/performance">Đánh Giá Nhân Viên</Link>,
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài Đặt Hệ Thống",
      children: [
        {
          key: "/settings/users",
          label: <Link to="/settings/users">Quản Lý Người Dùng</Link>,
        },
        {
          key: "/settings/roles",
          label: <Link to="/settings/roles">Phân Quyền</Link>,
        },
      ],
    },
    {
      key: "inbox",
      icon: <MessageOutlined />,
      label: "Tin Nhắn & Thông Báo",
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
