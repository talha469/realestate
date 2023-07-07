import React from 'react';
import { Button } from '@mui/material';
import './WelcomeScreen.css'; // Import CSS file for styling
import Image from './filterResults.png'

const FilterWelcomeScreen = ({setIsUserInteracted}) => {
  const handleClick = () => {
    setIsUserInteracted(true);
  };

  return (
    <div className="welcome-screen" style={{ textAlign: 'center' }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
    Click to view filtered results
    </h3>

    <img src={Image} alt="No property available" style={{ width: "100%" }} />
    <p style={{ marginTop: '10px', padding: '13px', fontSize: '16px' }}>
      
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

export default FilterWelcomeScreen;
