import React, { useRef, useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import './Video.css';
import SendForm from '../Contact/SendForm';

const Video = ({ videoDetails, isPlaying, onVideoToggle, onSendFormClick }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this value as needed
    };
  
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    };
  
    const observer = new IntersectionObserver(handleIntersection, options);
  
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  

  useEffect(() => {
    if (isPlaying && isVisible) {
      videoRef.current.play();
    } else if (!isPlaying && isVisible) {
      videoRef.current.pause();
    }
  }, [isPlaying, isVisible]);

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
          ></Box>
        )}
      </div>
      <Footer videoDetails={videoDetails} onSendFormClick={onSendFormClick} />
    </Stack>
  );
};

export default Video;
