import React from 'react';
import './Footer.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import { Stack, Box } from '@mui/material';
import { Typography, Card, CardContent, CardMedia } from '@mui/material' 
import { Bathtub, Hotel, LocationCity, MonetizationOn } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const Footer = ({ videoDetails, onSendFormClick }) => {

  const handleSendFormClick = () => {
    debugger
    onSendFormClick(videoDetails); // Pass videoDetails to the parent component
  };

  return (
    <Stack direction = 'row' sx={{ position: 'relative', bottom: '14vh', color: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'space-around' }}>
          <Stack direction="column" sx={{ flex: 1, marginLeft:'8vh' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Bathtub sx={{ color: 'white', fontSize:'16px' }} />
              <span> {videoDetails.bathrooms}</span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Hotel sx={{ color: 'white', fontSize:'16px' }} />
              <span> {videoDetails.bedrooms}</span>
            </Stack>
          </Stack>

          <Stack direction="column" sx={{ flex: 3, marginLeft:'5vh', marginRight:'30px' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationCity sx={{ color: 'white', fontSize:'16px' }} />
              <span> {videoDetails.city}</span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MonetizationOn sx={{ color: 'white', fontSize:'16px' }} />
              <span> {videoDetails.dealType}</span>
            </Stack>
          </Stack>
        </Stack>

      <Stack sx={{marginLeft:'16vh', marginRight:'5vh'}}>
      <IconButton onClick={handleSendFormClick}>
        <SendIcon sx={{ height: 45, color: "white", cursor: 'pointer', paddingRight: 2, transform:'rotate(-45deg)' }} />
      </IconButton>
      </Stack>

    </Stack>
  );
};

export default Footer;
