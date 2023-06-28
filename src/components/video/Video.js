import React, { useRef, useState, useEffect } from 'react';
import { Stack, Box, CircularProgress, Typography } from '@mui/material';
import Footer from '../footer/Footer';
import './Video.css';
import { color } from '@mui/system';

const Video = ({ videoDetails, isPlaying, onVideoToggle, onSendFormClick, isMuted }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (isMuted) {
      onVideoToggle(videoDetails.videoID);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  return (
    <Stack sx={{ width: '100%'}}>
      <div className="video">
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            color='white'
          >
            <CircularProgress />
            <Typography variant="body1" color="white" align="center">
              Loading...
            </Typography>
          </Box>
        ) : null}
        <video
          className={`video__player ${isLoading ? 'video__player--hidden' : ''}`}
          onClick={onVideoPress}
          muted={isMuted}
          ref={videoRef}
          loop
          controlsList="nodownload"
          src={videoDetails?.awsPathKey}
          onLoadedData={handleVideoLoad}
        ></video>
      </div>
      <Footer videoDetails={videoDetails} onSendFormClick={onSendFormClick} />
    </Stack>
  );
};

export default Video;
