// Notification.jsx
import React, { useState, useEffect } from 'react';
import './false.css'; // Import your CSS

const Notification = () => {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (visible) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setVisible(false);
      }, 1500);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [visible]);

  return (
    <div className="my-10">
      {visible && (
        <div className="notification" id="notification">
          <p >答錯了！</p>
          <img
            src="false.png"
            alt="Wrong Answer"
            id="falseImage"
            className={animate ? 'animate' : ''}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
