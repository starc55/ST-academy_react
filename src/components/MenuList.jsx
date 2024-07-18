import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  BarsOutlined,
  UserOutlined,
  JavaScriptOutlined,
  Html5Outlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/entry");
  };

  return (
    <Menu theme={darkTheme ? "dark" : "light"} className="menu-bar">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        <Link to="/activity">Activity</Link>
      </Menu.Item>
      <Menu.SubMenu key="lessons" icon={<BarsOutlined />} title="Lessons">
        <Menu.Item key="html" icon={<Html5Outlined />}>
          {" "}
          <Link to="/html">HTML</Link>{" "}
        </Menu.Item>
        <Menu.Item key="css">
          <Link to="/css">CSS</Link>
        </Menu.Item>
        <Menu.SubMenu key="advanced" title="Advanced">
          <Menu.Item key="javascript" icon={<JavaScriptOutlined />}>
            <Link to="/js">JavaScript</Link>
          </Menu.Item>
          <Menu.Item key="react">
            <Link to="/react">React</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
        <Link to="/about">About us</Link>
      </Menu.Item>
      <Menu.Item key="log out" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
