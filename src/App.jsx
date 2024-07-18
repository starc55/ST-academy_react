import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Entry from "./components/Entry";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import About from "./pages/About";
import Activity from "./pages/Activity";
import { HtmlLesson } from "./lessons/HtmlLesson";
import { CssLessons } from "./lessons/CssLessons";
import JsLessons from "./lessons/JsLessons";
import ReactLessons from "./lessons/ReactLessons";
import Test from "./pages/Test";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entry" element={<Entry />} />
        <Route path="/" element={<Home />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/html" element={<HtmlLesson />} />
        <Route path="/css" element={<CssLessons />} />
        <Route path="/js" element={<JsLessons />} />
        <Route path="/react" element={<ReactLessons />} />
        <Route path="/test" element={<Test />} />
        <Route path="/myresult" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
