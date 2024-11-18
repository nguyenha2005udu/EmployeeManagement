import React, { useState } from "react";
import { Layout as AntLayout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

const { Content } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Theo dõi kích thước màn hình
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AntLayout className="min-h-screen">
      <Sidebar collapsed={collapsed} isMobile={isMobile} />
      <AntLayout className={`site-layout ${collapsed ? "collapsed" : ""}`}>
        <Navbar>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-button"
          />
        </Navbar>
        <Content className="site-layout-content">{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
