import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import "../video/Video.css";

const LastVideoMessage = ({onContactAdmin}) => {
  const handleContactClick = () => {
    onContactAdmin();
  };

  return (
    <div className="video"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
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
        <Typography variant="h4" gutterBottom>
          Thank you for watching!
        </Typography>
        <Typography variant="body1" gutterBottom>
          For further assistance, please contact us:
        </Typography>
        <Button 
          variant="contained"
          color="primary"
          onClick={handleContactClick}
          startIcon={<Send />}
          sx={{ width: '150px', alignContent:'center' }}
        >
          Contact
        </Button>
      </Stack>
    </div>
  );
};

export default LastVideoMessage;