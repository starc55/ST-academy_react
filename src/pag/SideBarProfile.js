import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../pages/Page.css";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { UserProfile } from "../utils/UserProfile";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    } else if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    }
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleToggleSidebar = () => {
    if (window.innerWidth > 768) {
      const newCollapsedState = !collapsed;
      setCollapsed(newCollapsedState);
      localStorage.setItem("sidebarCollapsed", newCollapsedState);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isSmallScreen = windowWidth <= 768;

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible={!isSmallScreen}
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
        style={{ height: isSmallScreen ? "100%" : "auto" }}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="head"
        >
          {!isSmallScreen && (
            <Button
              onClick={handleToggleSidebar}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <UserProfile />
        </Content>
      </Layout>
    </Layout>
  );
}
