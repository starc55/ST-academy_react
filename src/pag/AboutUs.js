import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../pages/Page.css";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { FcAbout } from "react-icons/fc";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandZoom } from "react-icons/tb";
import { TiSocialAtCircular } from "react-icons/ti";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiCircleChevDown } from "react-icons/ci";
import about from "../imgs/about.jpg";
import { Input } from "antd";
import axios from "axios";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
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

  const sendingMessage = (event) => {
    event.preventDefault();

    if (author) {
      axios
        .post("http://localhost:1337/api/messages", {
          data: {
            text: message,
            author: author,
          },
        })
        .then((response) => {
          console.log("Message sent:", response.data);
          setMessage("");
          setAuthor("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    } else {
      alert("Author is required");
    }
  };

  const { TextArea } = Input;

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
          <div className="about_title">
            <FcAbout className="about_icon" /> <span>About our academy</span>
          </div>
          <div className="about_text_page">
            <div>
              <p className="about__text">
                In our academy, you will be promoted to the junior and then
                senior level. Later, you will also have the opportunity to
                receive a personal certificate on behalf of our academy. But you
                may have a question, "what can I do with this certificate?" will
                help you get accepted! If you want to take lessons from our
                teachers through online zoom, contact our social pages!{" "}
                <TiSocialAtCircular className="social" />
              </p>
              <div className="advice">
                <p>
                  Advice to our academy to develop this{" "}
                  <CiCircleChevDown className="down" />
                </p>
                <form onSubmit={sendingMessage}>
                  <Input
                    placeholder="author"
                    allowClear
                    onChange={(event) => setAuthor(event.target.value)}
                    value={author}
                  />
                  <br />
                  <br />
                  <TextArea
                    placeholder="advice to academy"
                    allowClear
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                  />
                  <br />
                  <br />
                  <Button type="dashed" htmlType="submit" id="submit">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
            <div className="about_r">
              <img src={about} alt="Image not foud" className="about_img" />
              <div>
                <p>
                  We bring our students to the professional level through our
                  academy website, that is, by giving online lessons. And we
                  mainly offer lessons from YouTube platforms{" "}
                  <span>
                    <IoLogoYoutube />
                  </span>
                  . But if you want a private online zoom{" "}
                  <TbBrandZoom className="zoom" /> lesson,{" "}
                  <Link to="/"> you need to get the premium version.</Link>
                </p>
              </div>
              <div className="social_icon">
                <a href="https://t.me/myblogprogramm">
                  <FaTelegramPlane className="socials telegramm" />
                </a>
                <a href="https://www.instagram.com/oga_vine25?igsh=b2V1ZWE2NWVzMjNn">
                  <FaInstagram className="socials" />
                </a>
                <a href="orziyevogabek67@gmail.com">
                  <MdEmail className="socials email" />
                </a>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
