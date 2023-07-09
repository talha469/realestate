import React from 'react';
import { Button } from '@mui/material';
import './WelcomeScreen.css'; // Import CSS file for styling
import Image from './filterResults.png';
import allVideoImage from './homeResults.png';

const WelcomeScreen = ({ setIsUserInteracted, isfilterWelcome, isHomeIconWelcome }) => {
  const handleClick = () => {
    setIsUserInteracted(true);
  };

  if (isfilterWelcome) {
    return (
      <div className="welcome-screen" style={{ textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px', fontFamily: 'Neutraface, sans-serif' }}>
          Click to view filtered results
        </h3>

        <p style={{ marginTop: '12px', padding: '3px', fontSize: '6px' }}>
          <img src={Image} alt="filterWelcome" style={{ width: '7%' }} />
        </p>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Neutraface, sans-serif' }}
        >
          Continue
        </Button>
      </div>
    );
  }

  if (isHomeIconWelcome) {
    return (
      <div className="welcome-screen" style={{ textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px', fontFamily: 'Neutraface, sans-serif' }}>
          You are viewing all videos now
        </h3>

        <p style={{ marginTop: '12px', padding: '3px', fontSize: '6px' }}>
          <img src={allVideoImage} alt="filterWelcome" style={{ width: '10%' }} />
        </p>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Neutraface, sans-serif' }}
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="welcome-screen" style={{ textAlign: 'center' }}>
      <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px', fontFamily: 'Neutraface, sans-serif' }}>
        Welcome to our video-based house hunting app! 🎥🏠💫
      </h3>
      <p style={{ marginTop: '10px', padding: '13px', fontSize: '16px', fontFamily: 'Neutraface, sans-serif' }}>
        Discover your dream home through captivating videos and connect with top realtors effortlessly.
      </p>
      <Button
        variant="contained"
        onClick={handleClick}
        style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Neutraface, sans-serif' }}
      >
        Continue
      </Button>
    </div>
  );
};

export default WelcomeScreen;
