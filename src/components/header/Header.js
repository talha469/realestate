import React from "react";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Searchbar from "./Searchbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import Image from './filename.png'
import { Margin } from "@mui/icons-material";
const Header = ({
  onFilterClick,
  sendSearchedText,
  inputEmptyTrigger,
  onHomeIconClick,
  notRenderSearches,
}) => {
  const handleHomeIconClick = () => {
    onHomeIconClick(true); // Call the parent function and pass `true`
  };

  return (
    <Stack
      className="header"
      direction="row"
      alignItems="center"
      p={0}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <HomeIcon
        onClick={handleHomeIconClick}
        sx={{ height: 45, color: "white", cursor: "pointer", paddingLeft: 2, touchAction: 'manipulation' }}
      />
      {!notRenderSearches && (
        <>
          <img src={Image} alt="No property available" style={{ width: "40vh", paddingtop:'5px' }} />
          {/* <Searchbar
            sendSearchedText={sendSearchedText}
            inputEmptyTrigger={inputEmptyTrigger}
          /> */}

          <IconButton onClick={onFilterClick}>
            <FilterListIcon
              sx={{
                height: 45,
                color: "white",
                cursor: "pointer",
                paddingRight: 2,
              }}
            />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default Header;
