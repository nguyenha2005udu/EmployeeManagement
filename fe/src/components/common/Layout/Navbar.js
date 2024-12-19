import React from "react";
import { Button, Avatar, Space, Dropdown, Badge, Breadcrumb } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const Navbar = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();

  const userMenuItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    return [
      {
        title: <Link to="/">Trang chủ</Link>,
      },
      ...pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        const title =
          pathSnippets[index].charAt(0).toUpperCase() +
          pathSnippets[index].slice(1);
        return {
          title: <Link to={url}>{title}</Link>,
        };
      }),
    ];
  };

  const handleToggle = (e) => {
    e.preventDefault();
    if (toggleCollapse) {
      toggleCollapse();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleToggle}
          className="trigger-button"
        />
        <Breadcrumb items={getBreadcrumbItems()} />
      </div>

      <div className="navbar-right">
        <Badge count={3} offset={[-5, 5]}>
          <Button type="text" icon={<BellOutlined />} />
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space className="user-dropdown">
            <Avatar size="small" icon={<UserOutlined />} />
            <span>Admin</span>
          </Space>
        </Dropdown>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
