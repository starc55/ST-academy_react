import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../pages/Page.css";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { curveCardinal } from "d3-shape";

const { Header, Sider, Content } = Layout;
const cardinal = curveCardinal.tension(0.2);

export default function ResultChart() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("testResults")) || [];
    const formattedData = results.map((result, index) => ({
      name: `Test ${index + 1}`,
      uv: result.score,
      total: result.total,
      date: result.date,
    }));
    setData(formattedData);
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
          <div className="result_t">
            Here you can see your result of test and your grow statistic !
          </div>

          <div>
            <AreaChart
              width={800}
              height={200}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              className="result_chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                type={cardinal}
                dataKey="uv"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            </AreaChart>
          </div>

          {/* <div className="let_test"></div> */}
        </Content>
      </Layout>
    </Layout>
  );
}
