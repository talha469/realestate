import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import Video from "./Video";
import "./SearchVideo.css";
import UserSpecificLastVideoMessage from "../UXScreen/UserSpecificLastVideoMessage";

const SearchVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideosDetails] = useState('');

  const getFilteredVideos = (id) => {
    axios
      .get(
        `https://visheshmanwani-001-site1.itempurl.com/fetchs3BucketData/${id}`
      )
      .then((result) => {
        const updatedVideos = result.data;
        console.log(updatedVideos);
        setVideosDetails(updatedVideos);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  };

  const handleOnHomeIconClick = () => {
    navigate("/");
  };

  useEffect(() => {
    getFilteredVideos(id);
  }, [id]);

  const handleExploreClicked = () => {
    navigate('/')
  }

  return (
    <div>
      <Header
        onHomeIconClick={handleOnHomeIconClick}
        notRenderSearches={true}
      />
      <div className="app__videos">
      <Video 
        key={videoDetails?.videoID}
        videoDetails={videoDetails}
        isNotMuted={true}
      />
      <UserSpecificLastVideoMessage exploreClicked={handleExploreClicked}/>
      </div>
      
    </div>
  );
};

export default SearchVideo;
