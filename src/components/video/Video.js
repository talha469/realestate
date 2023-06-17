import React, { useRef, useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import './Video.css';
import SendForm from '../Contact/SendForm';

const Video = ({ videoDetails, isPlaying, onVideoToggle, onSendFormClick  }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const onVideoPress = () => {
    onVideoToggle(videoDetails.videoID);
  };
  return (
    
    <Stack>
      <div className="video">
      <video
        className="video__player"
        onClick={onVideoPress}
        ref={videoRef}
        loop
        controls
        controlsList="nodownload"
        src={videoDetails?.awsPathKey}
      ></video>
      {!isPlaying && (
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'gray',
            fontSize: '4rem',
            cursor: 'pointer',
            height: '50px',
            width: '50px',
            zIndex: 1,
          }}
          onClick={onVideoPress}
        >
          {/* <PlayArrow sx={{ height: '100px', width: '100px', opacity: '0.5' }} /> */}
        </Box>
      )}
      {isPlaying && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'gray',
            fontSize: '4rem',
            cursor: 'pointer',
            height: '50px',
            width: '50px',
            zIndex: 1,
          }}
          onClick={onVideoPress}
        >
        </Box>
      )}
    </div>
    <Footer videoDetails={videoDetails} onSendFormClick= {onSendFormClick} />
    </Stack>

    
  );
};

export default Video;
