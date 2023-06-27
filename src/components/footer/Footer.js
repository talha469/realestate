import React, { useState, useEffect } from "react";
import "./Footer.css";
import { Stack, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from '@mui/icons-material/Reply';
import ShareIcon from '@mui/icons-material/Share';
const Footer = ({ videoDetails, onSendFormClick }) => {
  const handleSendFormClick = () => {
    onSendFormClick(videoDetails); // Pass videoDetails to the parent component
  };

  const handleShareClick = () => {
    const shareUrl = 'https://theproppyuser.netlify.app/video/' + videoDetails.videoID; // The URL to share
    const shareText = "Check out this video on The Proppy: \n"; // Optional share text

    // Share on WhatsApp // Share on WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`;

    // Share on Instagram
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;

    // Open the share window based on the user's platform
    if (navigator.share) {
      navigator
        .share({
          title: "Share Video",
          text: shareText,
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else if (navigator.userAgent.match(/Android/i)) {
      window.open(whatsappUrl);
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.open(instagramUrl);
    } else {
      console.log("Share not supported on this platform");
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        position: "relative",
        bottom: "22vh",
        color: "white",
        alignItems: "space-between",
        justifyContent: "center",
      }}
    >
      <Stack direction="column">
        <Box
          sx={{
            justifyContent: "center",
            flexWrap: "nowrap",
            marginLeft: "5vh",
          }}
        >
          {/* <Bathtub sx={{ color: 'white', fontSize:'16px' }} /> */}
          Bathroom :
          <span style={{ marginRight: "15px" }}> {videoDetails?.bathrooms}</span>
          {/* <Hotel sx={{ color: 'white', fontSize:'16px' }} /> */}
          Bedroom :
          <span style={{ marginRight: "15px" }}> {videoDetails?.bedrooms == 0 ? "Studio" : videoDetails?.bedrooms}</span>
        </Box>

        <Box
          sx={{
            alignItems: "flex-start",
            alignContent: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center",
            marginLeft: "5vh",
          }}
        >
          {/* <MonetizationOn sx={{ color: 'white', fontSize:'16px' }} /> */}
          Deal :
          <span style={{ marginRight: "15px" }}> {videoDetails.dealType}</span>
          {/* <LocationCity sx={{ color: 'white', fontSize:'16px' }} /> */}
          City :
          <span style={{ marginRight: "15px" }}> {videoDetails.city}</span>
        </Box>

        <Box
          sx={{
            justifyContent: "center",
            flexWrap: "nowrap",
            marginLeft: "5vh",
          }}
        >
          {videoDetails?.address &&(
            <>
          Address :
          <span style={{ marginRight: "15px" }}> {videoDetails?.address}</span>
          </>
          )}
         </Box>
      </Stack>


      <Box sx={{ paddingLeft: "5px", marginRight: "12px" }}>
        <IconButton onClick={handleSendFormClick}>
          <ReplyIcon
            sx={{
              height: 25,
              marginBottom:'1px',
              color: "white",
              cursor: "pointer",
              position:'relative',
              paddingRight: 1,
            }}
          />
        </IconButton>
        <IconButton onClick={handleShareClick}>
          <ShareIcon
            sx={{
              height: 25,
              marginTop:'5px',
              marginBottom: "35px",
              color: "white",
              cursor: "pointer",
              position: "relative",
              paddingRight: 1,
            }}
          />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Footer;
