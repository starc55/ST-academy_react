import React, { useEffect, useState } from "react";
import { Layout, Button, theme, Row, Col, Card, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SaveOutlined,
  SaveFilled,
  UpOutlined,
} from "@ant-design/icons";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import ToggleThemeButton from "../components/ToggleThemeButton";
import ReactPlayer from "react-player";
import videoLessonsr from "../data/ReactD";
import "../pages/Page.css";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [savedLessons, setSavedLessons] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    }

    const savedSavedLessons = localStorage.getItem("savedLessons");
    if (savedSavedLessons) {
      setSavedLessons(JSON.parse(savedSavedLessons));
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleToggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem("sidebarCollapsed", newCollapsedState);
  };

  const handleSave = (id) => {
    setSavedLessons((prevSavedLessons) => {
      const updatedSavedLessons = prevSavedLessons.includes(id)
        ? prevSavedLessons.filter((lessonId) => lessonId !== id)
        : [...prevSavedLessons, id];
      localStorage.setItem("savedLessons", JSON.stringify(updatedSavedLessons));
      return updatedSavedLessons;
    });
  };

  const handleShowSaved = () => {
    setShowSaved(!showSaved);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const displayedLessons = showSaved
    ? videoLessonsr.filter((lesson) => savedLessons.includes(lesson.id))
    : videoLessonsr;

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
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
          <Space>
            <Button
              onClick={handleToggleSidebar}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <Button
              onClick={handleShowSaved}
              type="text"
              icon={
                showSaved ? (
                  <SaveFilled style={{ color: "green" }} />
                ) : (
                  <SaveOutlined />
                )
              }
            >
              {showSaved ? "Show All" : "Show Saved"}
            </Button>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: "24px",
            }}
          >
            <Row gutter={[16, 16]} justify="center">
              {displayedLessons.map((lesson) => (
                <Col xs={24} sm={12} md={8} lg={8} key={lesson.id}>
                  <Card
                    hoverable
                    style={{ borderRadius: borderRadiusLG }}
                    cover={
                      <ReactPlayer
                        url={lesson.url}
                        width="100%"
                        height="200px"
                        controls
                      />
                    }
                  >
                    <Card.Meta
                      title={
                        <Space>
                          {lesson.title}
                          <Button
                            type="link"
                            icon={
                              savedLessons.includes(lesson.id) ? (
                                <SaveFilled style={{ color: "green" }} />
                              ) : (
                                <SaveOutlined />
                              )
                            }
                            onClick={() => handleSave(lesson.id)}
                          />
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
      {showScrollToTop && (
        <Button
          type="primary"
          shape="circle"
          icon={<UpOutlined />}
          size="large"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        />
      )}
    </Layout>
  );
}
