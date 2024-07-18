import { Layout, Button, theme, notification } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../pages/Page.css";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  FaUniversity,
  FaReact,
  FaCaretRight,
} from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";
import { TbSchool, TbBrandJavascript } from "react-icons/tb";
import { SiKhanacademy, SiHtmlacademy } from "react-icons/si";
import { MdComputer, MdOutlinePlayLesson } from "react-icons/md";
import { ImHtmlFive2 } from "react-icons/im";
import {
  FaAirbnb,
  FaAngellist,
  FaAlgolia,
  FaAngular,
  FaAtlassian,
  FaCss3,
  FaPersonRunning,
} from "react-icons/fa6";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { Skeleton } from "antd";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [loadingske, setLoadingske] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setTimeout(() => {
      setLoadingske(false);
    }, 1000);
  }, []);

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
          <div>
            <Marquee>
              <FaUniversity className="marque" />
              <LiaUniversitySolid className="marque" />
              <TbSchool className="marque" />
              <SiKhanacademy className="marque" />
              <SiHtmlacademy className="marque" />
              <FaAirbnb className="marque" />
              <FaAngellist className="marque" />
              <FaReact className="marque" />
              <TbBrandJavascript className="marque" />
              <MdComputer className="marque" />
              <FaCss3 className="marque" />
              <FaAlgolia className="marque" />
              <FaAngular className="marque" />
              <FaAtlassian className="marque" />
              <MdOutlinePlayLesson className="marque" />
              <ImHtmlFive2 className="marque" />
            </Marquee>
          </div>
          {loadingske ? (
            <Skeleton active />
          ) : (
            <>
              <div>
                <p className="home_title">
                  Welcome to our <span>Academy!</span>
                </p>
              </div>
              <div className="home_def">
                <div className="home__text1">
                  <FaCaretRight className="home__icon" />
                  <p className="home_text">The advantage of our academy</p>
                  <br />
                  <div>
                    <p>
                      In our academy, our students take additional classes, and
                      not only our students, but also newcomers, i.e. those who
                      are entering the world of programming, can easily reach
                      the professional level.
                    </p>
                  </div>
                </div>
                <div className="home__text2">
                  <FaCaretRight className="home__icon" />
                  <p className="home_text">Benefits of our academy</p>
                  <br />
                  <div>
                    <p>
                      Our academy offers many benefits, for example, you can get
                      free practice for some of our classes by inviting a
                      student to our academy, or more precisely, to our site,
                      that is, a referral system. you have a chance to get !
                    </p>
                  </div>
                </div>
              </div>
              <div className="start_home">
                <p>Let's start travel !</p>
                <span>
                  <FaPersonRunning />
                </span>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
