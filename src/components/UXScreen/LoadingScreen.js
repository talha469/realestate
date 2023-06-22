import React from "react";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";

const LoadingContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LoadingText = styled(Typography)`
  color: #fff;
  margin-top: 10px;
`;

const LoadingScreen = () => {
  return (
    <div>
      {/* Your application content here */}

      {/* Loading screen */}
      <Backdrop open={true}>
        <LoadingContainer>
          <CircularProgress color="inherit" />
          <LoadingText variant="h6">Loading...</LoadingText>
        </LoadingContainer>
      </Backdrop>
    </div>
  );
};

export default LoadingScreen;
