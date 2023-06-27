import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Video from "./components/video/Video";
import axios from "axios";
import FormComponent from "./components/header/FormComponent";
import SendForm from "./components/Contact/SendForm";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import LoadingScreen from "./components/UXScreen/LoadingScreen";
import LastVideoMessage from "./components/UXScreen/LastVideoMessage";
import NoPropertyAvailable from "./components/UXScreen/NoPropertyAvailable";
import WelcomeScreen from "./components/UXScreen/WelcomeScreen";

function App() {
  const [videosDetails, setVideosDetails] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSendFormOpen, setIsSendFormOpen] = useState(false);
  const [isVideoInformation, setIsVideoInformation] = useState(true);
  const [selectedVideoData, setSelectedVideoData] = useState("");
  const [contactData, sendContactData] = useState([]);
  const [currentVideoID, setCurrentVideoID] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);
  const [rentMax, setRentMax] = useState(0);
  const [buyMax, setBuyMax] = useState(0);

  const handleVideoDetails = (data) => {
    setVideosDetails(data);

    let maxRentPrice = 0;
    let maxBuyPrice = 0;

    for (let i = 0; i < data.length; i++) {
      const apartment = data[i];

      if (apartment.dealType === "Rent") {
        if (apartment.price > maxRentPrice) {
          maxRentPrice = apartment.price;
        }
      } else if (apartment.dealType === "Buy") {
        if (apartment.price > maxBuyPrice) {
          maxBuyPrice = apartment.price;
        }
      }
    }

    setRentMax(maxRentPrice);
    setBuyMax(maxBuyPrice);
  };

  const handleFormSubmit = (data) => {
    getFilteredVideos(data);
    setIsFormOpen(false);
  };

  const handleIsUserInteracted = () => {
    setIsWelcomeScreen(false);
  };

  const handleContactAdmin = () => {
    setIsSendFormOpen(true);
    setIsVideoInformation(false);
  };

  useEffect(() => {
    // Clear application cache on web reload
    window.onbeforeunload = () => {
      localStorage.clear();
      sessionStorage.clear();
    };
  }, []);

  const handleIsSendFormOpen = () => {
    debugger;
    setIsSendFormOpen(false);
    setIsVideoInformation(true);
  };

  const handleSendFormData = (formData) => {
    const url = "https://visheshmanwani-001-site1.itempurl.com/ContactForm";
    debugger
    let data = {};
    if(selectedVideoData.length != 0){
      data = {
        Name: formData.name,
        Email: formData.email,
        Message: formData.message,
        VideoID: selectedVideoData.videoID,
        AWSPathKey: selectedVideoData.awsPathKey,
        DealType: selectedVideoData.dealType,
        Price: parseInt(selectedVideoData.price),
        Bedrooms: selectedVideoData.bedrooms,
        Bathrooms: parseInt(selectedVideoData.bathrooms),
        Zip:
          selectedVideoData?.zip !== null
            ? selectedVideoData?.zip.toString()
            : null,
        City: selectedVideoData.city,
        GoogleMapAddress: selectedVideoData.googleMapAddress,
        IsPlaying: selectedVideoData.isPlaying,
      };
    }

    else{
      data = {
        Name: formData.name,
        Email: formData.email,
        Message: formData.message
      }
    }

    setTimeout(() => {
      setIsSendFormOpen(false);
    }, 3500);

    axios
      .post(url, data)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  };

  const getFilteredVideos = (requestData) => {
    setIsScreenLoading(true);
    const url = "https://visheshmanwani-001-site1.itempurl.com/fetchs3BucketData";
    const data = {
      Bedrooms: requestData.bedrooms,
      Bathrooms: requestData.bathrooms,
      City: requestData.city,
      PriceMin: requestData.priceRange[0],
      PriceMax: requestData.priceRange[1],
      DealType: requestData.rentOrBuy,
    };

    axios
      .post(url, data)
      .then((result) => {
        const updatedVideos = result.data.map((video) => ({
          ...video,
          isPlaying: false,
        }));
        setVideosDetails(updatedVideos);
        setIsScreenLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  };

  const getData = () => {
    setIsScreenLoading(true);
    axios
      .get("https://visheshmanwani-001-site1.itempurl.com/fetchs3BucketData")
      .then((result) => {
        const updatedVideos = result.data.map((video) => ({
          ...video,
          isPlaying: false,
        }));
        handleVideoDetails(updatedVideos);
        setIsScreenLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    setIsWelcomeScreen(true);
  }, []);

  const handleVideoToggle = (videoID) => {
    const updatedVideos = videosDetails.map((video) => {
      if (video.videoID === videoID) {
        return { ...video, isPlaying: !video.isPlaying };
      }
      return { ...video, isPlaying: false };
    });
    setVideosDetails(updatedVideos);
    setCurrentVideoID((prevVideoID) => {
      if (prevVideoID === videoID) {
        return null;
      } else {
        return videoID;
      }
    });
  };

  const handleFilterClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleHomeIconClick = (clicked) => {
    debugger;
    if (clicked) {
      getData();
      setIsFormOpen(false);
    }
  };

  const hanldeSendFormClick = (data) => {
    debugger
    setIsSendFormOpen(true);
    setSelectedVideoData(data);
  };

  const handleUploadInProcess= (data) => {
    debugger
    if(data){
     setIsScreenLoading(true);
    }
    else{
      setIsScreenLoading(false);
    }
  } 

  const HandleSearchedTextFilter = (search) => {
    setIsScreenLoading(true);
    const url = `https://visheshmanwani-001-site1.itempurl.com/fetchs3BucketData/searchFilteredData?Requiredfilters=${encodeURIComponent(
      search
    )}`;
    axios
      .post(url, search)
      .then((result) => {
        const updatedVideos = result.data.map((video) => ({
          ...video,
          isPlaying: false,
        }));
        setVideosDetails(updatedVideos);
        setIsScreenLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  };

  const inputtrigger = (data) => {
    if (data) {
      getData();
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <Header
                  onFilterClick={handleFilterClick}
                  sendSearchedText={HandleSearchedTextFilter}
                  inputEmptyTrigger={inputtrigger}
                  onHomeIconClick={handleHomeIconClick}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      isFormOpen ? (
                        <FormComponent
                          onSubmit={handleFormSubmit}
                          buyMax={buyMax}
                          rentMax={rentMax}
                        />
                      ) : isScreenLoading ? (
                        <LoadingScreen />
                      ) : (
                        <div className="app__videos">
                          {isWelcomeScreen ? (
                            <WelcomeScreen
                              setIsUserInteracted={handleIsUserInteracted}
                            />
                          ) : (
                            <>
                              {videosDetails && videosDetails.length > 0 ? (
                                videosDetails.map((item, index) => (
                                  <Video
                                    key={item?.videoID}
                                    videoDetails={item}
                                    isPlaying={item.isPlaying}
                                    onVideoToggle={handleVideoToggle}
                                    onSendFormClick={hanldeSendFormClick}
                                    isMuted={index === 0}
                                    isLastVideo={
                                      index === videosDetails.length - 1
                                    }
                                  />
                                ))
                              ) : (
                                <NoPropertyAvailable />
                              )}
                              {videosDetails && videosDetails.length > 0 && (
                                <LastVideoMessage
                                  onContactAdmin={handleContactAdmin}
                                />
                              )}
                            </>
                          )}
                        </div>
                      )
                    }
                  />
                </Routes>
              </div>
            }
          />
          <Route path="/admin" element={isScreenLoading ? (
                        <LoadingScreen />
                      ) : (<AdminDashboard uploadInProcess={handleUploadInProcess}/>)} />
        </Routes>

        {isSendFormOpen && (
          <div className="app__fullscreen">
            <SendForm
              onClose={handleIsSendFormOpen}
              onSubmit={handleSendFormData}
              videoData={selectedVideoData}
              isVideoInformation={isVideoInformation}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
