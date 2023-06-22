import React from 'react';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Searchbar from './Searchbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { colors } from '@mui/material';
import FormComponent from './FormComponent';

const Header = ({ onFilterClick,sendSearchedText, inputEmptyTrigger }) => {
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
        width: "100%",
      }}
    >
      <HomeIcon sx={{ height: 45, color: "white", cursor: 'pointer', paddingLeft: 2 }} />
      <Searchbar sendSearchedText={sendSearchedText} inputEmptyTrigger={inputEmptyTrigger}/>

      <IconButton onClick={onFilterClick}>
        <FilterListIcon sx={{ height: 45, color: "white", cursor: 'pointer', paddingRight: 2 }} />
      </IconButton>
    </Stack>
  );
};



export default Header;
