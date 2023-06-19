import React, { useState } from 'react';
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ sendSearchedText, inputEmptyTrigger }) => {
  const [searchTerm, setSearchItem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      sendSearchedText(searchTerm);
    }
  };

  const handleBlur = () => {
    if (searchTerm === '') {
      inputEmptyTrigger(true);
      // Handle the case when the input is empty
      console.log('Input is empty');
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
        background: 'transparent',
      }}
    >
      <input
        className='search-bar'
        placeholder='3 bedroom,2 bat..'
        value={searchTerm}
        onChange={(e) => setSearchItem(e.target.value)}
        onBlur={handleBlur}
        style={{
          border: 'none',
          color: 'white',
          background: 'transparent',
          fontStyle: 'italic',
        }}
        onFocus={() => {
          document.querySelector('.search-bar').style.outline = 'none';
        }}
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'white' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
