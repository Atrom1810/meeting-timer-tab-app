import React, { useState, useEffect } from 'react';
import './App.css';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            displayNotification();
            setIsActive(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  const displayNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Timer Countdown Over!', {
            body: 'Your timer has reached zero.',
          });
        }
      });
    }
  };

  return (
    <div>
      <h1>Timer App</h1>
      <div className="container">
        <label className="label">Minutes:</label>
        <input
          type="number"
          className="input"
          value={minutes}
          onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10)))}
        />
        <label className="label">Seconds:</label>
        <input
          type="number"
          className="input"
          value={seconds}
          onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value, 10)))}
        />
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p className="timer">Countdown: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>
    </div>
  );
}

export default Timer;
