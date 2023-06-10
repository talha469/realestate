import React from 'react';
import './Sidebar.css';
import SendIcon from '@mui/icons-material/Send';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

function Sidebar() {
  return (
    <div className='video__sidebar'>
      <button className='transparent__button'>
        <ConnectWithoutContactIcon style={{ width: 45, height: 45, cursor: 'pointer' }} />
      </button>
    </div>
  );
}

export default Sidebar;


