import React from 'react';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import AppleIcon from '@mui/icons-material/Apple';
import Searchbar from './Searchbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { colors } from '@mui/material';

const Header = () => {
  return (
    <Stack
      className='header'
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
        width: "95%",
      }}
    >
      <AppleIcon sx={{ height: 45, color: "white", cursor:'pointer', paddingLeft:1 }} />
      <Searchbar />
      <FilterListIcon sx={{ height: 45, color: "white", cursor:'pointer' , paddingRight:1}} />
    </Stack>
  );
};

export default Header;
