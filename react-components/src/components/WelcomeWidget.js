import React, { useState, useEffect } from 'react';
import './WelcomeWidget.css';

const WelcomeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div className="welcome-widget">
      <h3>Welcome to React Integration!</h3>
      <div className="widget-content">
        <div className="time-display">
          <p><strong>Current Time:</strong> {currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="counter-section">
          <p><strong>Counter:</strong> {counter}</p>
          <div className="button-group">
            <button onClick={handleIncrement} className="btn btn-primary">
              Increment
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWidget;