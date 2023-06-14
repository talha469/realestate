import React from 'react';
import './Footer.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import { Stack, Box } from '@mui/material';
import { Typography, Card, CardContent, CardMedia } from '@mui/material' 
import { Bathtub, Hotel, LocationCity, MonetizationOn } from '@mui/icons-material';

const Footer = ({ videoDetails }) => {
  return (
    <Stack sx={{ position: 'relative', bottom: '14vh', color: 'white', alignItems: 'space-around' }}>
      {/* <Stack direction="row" sx={{ marginLeft: '4vh', fontSize: '10px', paddingBottom:'3px' }}>
        <Box>
          <Typography sx={{fontFamily: 'Lato', fontSize:'12px', paddingRight:'10px'}}>
             Real Estate
          </Typography>
        </Box>       
        <Box>  
          <HomeIcon sx={{fontSize:'16px'}}/>
        </Box>
      </Stack> */}
      
      <Box sx={{ maxWidth: '100%', overflow: 'auto', bottom: '10px', marginLeft: '6vh', fontFamily: 'Poppins', fontSize:'12px' }}>
        <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'space-around' }}>

          <Stack direction="column" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ApartmentIcon sx={{ color: 'white', fontSize:'16px' }} />
              <span>Bathrooms: {videoDetails.bathrooms}</span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Hotel sx={{ color: 'white', fontSize:'16px' }} />
              <span>Bedrooms: {videoDetails.bedrooms}</span>
            </Stack>
          </Stack>

          <Stack direction="column" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationCity sx={{ color: 'white', fontSize:'16px' }} />
              <span>City: {videoDetails.city}</span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MonetizationOn sx={{ color: 'white', fontSize:'16px' }} />
              <span>Deal Type: {videoDetails.dealType}</span>
            </Stack>
          </Stack>
        </Stack>

      </Box>
    </Stack>
  );
};

export default Footer;
