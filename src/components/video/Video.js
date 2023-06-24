import React, { useRef, useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import Footer from '../footer/Footer';
import { Typography, Button } from "@mui/material";
import './Video.css';

const Video = ({ videoDetails, isPlaying, onVideoToggle, onSendFormClick,isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this value as needed
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
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
    if (isPlaying) {
      videoRef.current?.play();
    } else if (!isPlaying) {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const onVideoPress = () => {
    onVideoToggle(videoDetails.videoID);
  };

  return (
    <Stack sx={{width:'100%'}}>
      <div className="video">

        <video
          className="video__player"
          onClick={onVideoPress}
          // muted={isMuted}
          ref={videoRef}
          loop
          // controls
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
            {/* <Pause sx={{ height: '100px', width: '100px', opacity: '0.5' }} /> */}
          </Box>
        )}
      </div>
      <Footer videoDetails={videoDetails} onSendFormClick={onSendFormClick} />
      {/* Thank you message and contact button for the last video */}
      
    </Stack>
  );
};

export default Video;
