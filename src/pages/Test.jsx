import React, { useRef, useState } from "react";
import "../utils/util.css";
import { testdata } from "../data/testData";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const Test = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(testdata[index]);
  const [lock, setLock] = useState(false);
  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const navigate = useNavigate();

  let option_array = [Option1, Option2, Option3, Option4];

  const navigateprofile = () => {
    navigate("/profile");
  };

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === testdata.length - 1) {
        setResult(true);
        saveResultAndNavigate();
        return 0;
      }
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setQuestion(testdata[newIndex]);
        setLock(false);
        option_array.map((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
          return null;
        });
        return newIndex;
      });
    }
  };

  const saveResultAndNavigate = () => {
    const currentResults =
      JSON.parse(localStorage.getItem("testResults")) || [];
    const newResults = [
      ...currentResults,
      { score, total: testdata.length, date: new Date().toISOString() },
    ];
    localStorage.setItem("testResults", JSON.stringify(newResults));
    navigate("/myresult");
  };

  const reset = () => {
    setIndex(0);
    setQuestion(testdata[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="test container_test">
      <AiOutlineQuestionCircle
        className="tour"
        data-tooltip-id="tour-tooltip"
        data-tooltip-content="You can test your knowledge by taking the test and the results will be sent to your results window"
      />
      <Tooltip id="tour-tooltip" place="top" type="dark" effect="solid" className="tooltip-custom"/>
      <div className="test_t">
        <h1>Quiz app</h1>
        <button
          className="button"
          onClick={navigateprofile}
          title="Back to profile"
        >
          <div className="button-box">
            <span className="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
            <span className="button-elem">
              <svg viewBox="0 0 46 40">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>
      </div>

      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button className="test_btn" onClick={next}>
            Next
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
          <div className="index">
            {index + 1} of {testdata.length} questions
          </div>{" "}
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {testdata.length}
          </h2>
          <button className="submit_btn" onClick={reset}>
            <span className="circle1 span_btn"></span>
            <span className="circle2 span_btn"></span>
            <span className="circle3 span_btn"></span>
            <span className="circle4 span_btn"></span>
            <span className="circle5 span_btn"></span>
            <span className="text span_btn">Submit</span>
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Test;
