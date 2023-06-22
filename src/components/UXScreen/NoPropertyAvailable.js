import React from "react";
import { Typography, Box } from "@mui/material";
import Image from "./nodata.png";

const NoPropertyAvailable = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        alignItems:'center',
        alignContent:'center',
        marginTop:'15vh'
      }}
    >
      <Typography variant="h4" sx={{ color: "white", marginBottom: "20px" }}>
        No listings found
      </Typography>
      <Typography variant="h5" sx={{ color: "white", marginBottom: "20px" }} gutterBottom>
          Try searching with different filters
        </Typography>
      <img src={Image} alt="No property available" style={{ width: "100%" }} />
    </Box>
  );
};

export default NoPropertyAvailable;
