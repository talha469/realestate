import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import "../video/Video.css";
import Image from "./exploreMore.png";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const UserSpecificLastVideoMessage = ({exploreClicked}) => {
  const handleContactClick = () => {
    exploreClicked(true)
  };

  return (
    <div className="video"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
        backgroundColor: "black",
        marginBottom:'45vh'
      }}
    >
      <Stack
        sx={{
          textAlign: "center",
          color: "white",
          alignContent:'center',
          alignItems:"center"
        }}
        spacing={2}
      >
        <img src={Image} alt="No property available" style={{ width: "40vh" }} />
        <Typography variant="h4" gutterBottom>
          Explore more videos
        </Typography>
        <Typography variant="body1" gutterBottom>
        </Typography>
        <Button 
          variant="contained"
          color="primary"
          onClick={handleContactClick}
          startIcon={<TravelExploreIcon sx={{ transform: 'rotate(-45deg)' }}/>}
          sx={{ width: '150px', alignContent:'center' }}
        >
          Home Page
        </Button>
      </Stack>
    </div>
  );
};

export default UserSpecificLastVideoMessage;
