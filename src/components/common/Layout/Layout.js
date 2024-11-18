import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} />
      </aside>
      <div className="main-wrapper">
        <header className="header">
          <Navbar collapsed={collapsed} toggleCollapse={handleCollapse} />
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
