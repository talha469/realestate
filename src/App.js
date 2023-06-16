import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Video from './components/video/Video';
import axios from 'axios';
import FormComponent from './components/header/FormComponent';
import SendForm from './components/Contact/SendForm';

function App() {
  const [videosDetails, setVideosDetails] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSendFormOpen, setIsSendFormOpen] = useState(false);
  const [selectedVideoData, setSelectedVideoData] = useState('');

  const handleFormSubmit = (data) => {
    getFilteredVideos(data);
    setIsFormOpen(false);
    console.log(data);
  };

  const handleIsSendFormOpen = () => {
    setIsSendFormOpen(false);
  };

  const handleSendFormData = (formData) => {
    
    const url = 'https://localhost:7027/ContactForm';

    const data = {
      "Name":formData.name,
      "Email":formData.email,
      "Message":formData.message,
      "VideoID":selectedVideoData.videoID,
      "AWSPath":selectedVideoData.awspath,
      "DealType":selectedVideoData.dealType,
      "Price":parseInt(selectedVideoData.price),
      "Bedrooms":parseInt(selectedVideoData.bedrooms),
      "Bathrooms":parseInt(selectedVideoData.bathrooms),
      "Zip": selectedVideoData.zip.toString(),
      "City":selectedVideoData.city,
      "GoogleMapAddress":selectedVideoData.googleMapAddress,
      "IsPlaying":selectedVideoData.isPlaying
    }

    setTimeout(() => {
      setIsSendFormOpen(false);
    }, 3500);

    axios
      .post(url, data)
      .then((result) => {  

      })
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  }

  const getFilteredVideos = (requestData) => {
    const url = 'https://localhost:7027/fetchs3BucketData';
    const data = {
      "Bedrooms": parseInt(requestData.bedrooms),
      "Bathrooms": parseInt(requestData.bathrooms),
      "City": requestData.city,
      "PriceMin": requestData.priceRange[0],
      "PriceMax": requestData.priceRange[1],
      "DealType": requestData.rentOrBuy
    };

    axios
      .post(url, data)
      .then((result) => {
        const updatedVideos = result.data.map((video) => ({
          ...video,
          isPlaying: false,
        }));
        setVideosDetails(updatedVideos);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error or log it to understand the issue
      });
  };

  const getData = () => {
    axios
      .get('http://realestatedbaws-001-site1.gtempurl.com/fetchs3BucketData')
      .then((result) => {
        const updatedVideos = result.data.map((video) => ({
          ...video,
          isPlaying: false,
        }));
        setVideosDetails(updatedVideos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleVideoToggle = (videoID) => {
    const updatedVideos = videosDetails.map((video) => {
      if (video.videoID === videoID) {
        return { ...video, isPlaying: !video.isPlaying };
      }
      return { ...video, isPlaying: false };
    });
    setVideosDetails(updatedVideos);
  };

  const handleFilterClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const hanldeSendFormClick = (data) => {

    setIsSendFormOpen(true);
    setSelectedVideoData(data);
  };

  return (
    <div className="App">
      <Header onFilterClick={handleFilterClick} />
      {isFormOpen ? (
        <FormComponent onSubmit={handleFormSubmit} />
      ) : (
        <div className="app__videos">
          {videosDetails.map((item) => (
            <Video
              key={item?.videoID}
              videoDetails={item}
              isPlaying={item.isPlaying}
              onVideoToggle={handleVideoToggle}
              onSendFormClick={hanldeSendFormClick}
            />
          ))}
        </div>
      )}
      {isSendFormOpen && (
        <div className="app__fullscreen">
          <SendForm  onClose={handleIsSendFormOpen} onSubmit={handleSendFormData} videoData={selectedVideoData}/>
        </div>
      )}
    </div>
  );
}

export default App;
