import React from 'react';
import { Button } from '@mui/material';
import './WelcomeScreen.css'; // Import CSS file for styling

const WelcomeScreen = ({setIsUserInteracted}) => {
  const handleClick = () => {
    setIsUserInteracted(true);
  };

  return (
    <div className="welcome-screen" style={{ textAlign: 'center' }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
      Welcome to our video-based house hunting app! 🎥🏠💫
    </h3>
    <p style={{ marginTop: '10px', padding: '13px', fontSize: '16px' }}>
      Discover your dream home through captivating videos and connect with top realtors effortlessly.
    </p>
    <Button
      variant="contained"
      onClick={handleClick}
      style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}
    >
      Continue
    </Button>
  </div>
  );
};

export default WelcomeScreen;
