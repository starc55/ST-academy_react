import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comp.css';
import log from '../imgs/log.svg';
import AnimatedHeading from './AnimatingHeading';


const Entry = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const register = () => {
    navigate('/register'); 
  };

  const login = () => {
    navigate('/login');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5500);
  }, []);

  return (
    <div>
      {loading ? (
        <AnimatedHeading />
      ) : (
        <div>
          <p className="entry_text">
            Welcome to <span>ST academy</span>!
          </p>
          <div className="log_btn">
            <button className="reg" onClick={register}>
              Register
            </button>
            <button className="button2" onClick={login}>
              Login
            </button>
            <img src={log} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
