import React from "react";
import "./Footer.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import { Stack, Box } from "@mui/material";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import {
  Bathtub,
  Hotel,
  LocationCity,
  MonetizationOn,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const Footer = ({ videoDetails, onSendFormClick }) => {
  const handleSendFormClick = () => {
    onSendFormClick(videoDetails); // Pass videoDetails to the parent component
  };

  return (
    <Stack
      direction="row"
      sx={{
        position: "relative",
        bottom: "22vh",
        color: "white",
        alignItems: "space-around",
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


      <Box sx={{ paddingLeft: "5px", marginRight: "15px" }}>
        <IconButton onClick={handleSendFormClick}>
          <SendIcon
            sx={{
              height: 25,
              marginBottom:'25px',
              color: "white",
              cursor: "pointer",
              position:'relative',
              paddingRight: 2,
              transform: "rotate(-45deg)",
            }}
          />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Footer;
