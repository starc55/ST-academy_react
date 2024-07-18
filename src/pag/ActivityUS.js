import { Layout, Button, theme, notification } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../pages/Page.css";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { Col, Row, Statistic } from "antd";
import statistic from "../imgs/statistic.svg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const { Header, Sider, Content } = Layout;

const data = [
  {
    name: "2022",
    user: 1000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2023",
    user: 2750,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2024",
    user: 3855,
    pv: 9800,
    amt: 2290,
  },
];

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const openNotification = () => {
      notification.info({
        message: "Welcome to our page!",
        description: "In this page you can see our grow statistic and works !",
        duration: 5,
        showProgress: true,
      });
    };

    
    const delay = setTimeout(openNotification, 2000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(delay); 
    };
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    } else if (window.innerWidth <= 768) {
      setCollapsed(true);
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
          <div className="statistic_first">
            <div>
              <Row gutter={7} className="st_n">
                <Col span={4}>
                  <Statistic title="Active Users" value={3000} />
                </Col>
                <Col span={7}>
                  <Statistic title="End our course" value={2570} />
                </Col>
              </Row>
              <p className="statistic_f_text">
                Here are our users and students who actively participate in our
                classes. <span>You can also be among them.</span>
              </p>
            </div>
            <div>
              <img src={statistic} alt="SVG not found" className="f_svg" />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className="annual">
            <div>
              <AreaChart
                width={500}
                height={200}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                className="st_chart"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="user"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </div>
            <div className="annual_text">
              <p>Here is our annual activity!</p>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
