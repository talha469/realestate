import React, { useState } from 'react'
import {Paper, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const Searchbar = ({sendSearchedText}) => {
    const[searchTerm, setSearchItem]= useState('');
    //const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault(); // this doesnt allow to reload the page on form submit
  
      if(searchTerm){
        sendSearchedText(searchTerm);
      }
    }
    return (
      <Paper
      component='form'
      onSubmit={handleSubmit}
      sx={{
          borderRadius: 20,
          border:'1px solid #e3e3e3',
          pl:2,
          boxShadow:'none',
          mr:{sm: 5},
          background:'transparent'  
      }}
      >
          <input
          className='search-bar'
          placeholder='3 bedroom, 2 bathroom..'
          value={searchTerm}
          onChange={(e) => {setSearchItem(e.target.value)}}
          style={{
              border: 'none',
              color:'white',
              background:'transparent'
          }}
          onFocus={() => {
            // This will make the border transparent when the input is focused
            document.querySelector(".search-bar").style.outline = "none";
          }}
          />
          <IconButton type='submit' sx={{p:'10px',color:'white'}} aria-label='search'>
              <SearchIcon/>
          </IconButton>
      </Paper>
    )
}

export default Searchbar