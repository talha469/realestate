import React from 'react';
import './Sidebar.css';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@material-ui/core/IconButton';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

function Sidebar() {
  return (
    <div className='video__sidebar'>
      <IconButton  className='transparent__button' >
        <SendIcon style={{ width: 35, height: 35, cursor: 'pointer', color:'#fdfdfd' }} />
      </IconButton >
    </div>
  );
}

export default Sidebar;
