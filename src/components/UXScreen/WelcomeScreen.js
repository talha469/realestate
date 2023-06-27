import React from 'react';
import { Button } from '@mui/material';
import './WelcomeScreen.css'; // Import CSS file for styling

const WelcomeScreen = ({setIsUserInteracted}) => {
  const handleClick = () => {
    setIsUserInteracted(true);
  };

  return (
    <div className="welcome-screen">
      <h3 style={{ marginTop: '40px' }}>Scroll Videos</h3>
      <Button variant="contained" onClick={handleClick} style={{ marginTop: '20px' }}>
      Continue
    </Button>
    </div>
  );
};

export default WelcomeScreen;
