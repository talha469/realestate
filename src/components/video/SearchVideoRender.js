import React from "react";
import './Video.css'
import { Stack, Box } from '@mui/material';
import Footer from '../footer/Footer';

const SearchVideoRender = ({videoDetails,onSendFormClick }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <div className="video">
        <video
          className="video__player"
          muted={true}
          autoPlay
          loop
          controlsList="nodownload"
          src={videoDetails?.awsPathKey}
        ></video>
      </div>
      <Footer videoDetails={videoDetails} onSendFormClick={onSendFormClick} />
      {/* Thank you message and contact button for the last video */}
    </Stack>
  );
};

export default SearchVideoRender;
