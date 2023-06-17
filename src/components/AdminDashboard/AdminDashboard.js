import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Typography,
  Container,
} from '@material-ui/core';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const AdminDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dealType, setDealType] = useState('Rent');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [city, setCity] = useState('');

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const convertVideoToString = (video) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoString = reader.result;
        resolve(videoString);
      };
      reader.onerror = reject;
      reader.readAsDataURL(video);
    });
  };

  const sendVideoData = (uploadVideoData) => {
    console.log(uploadVideoData)
    // Send video data to your C# API
    axios
      .post('https://localhost:7027/AdminDashboard', uploadVideoData)
      .then((response) => {
        console.log('Video data sent successfully:', response.data);
        // Perform any desired actions or handle the response from the backend
      })
      .catch((error) => {
        console.error('Error sending video data:', error);
        // Handle the error appropriately
      });
  };

  const handleSubmit = async () => {
    if (selectedVideo) {
      // Convert video to string
      const videoData = await convertVideoToString(selectedVideo);
      // Send video data to your C# API

        const uploadVideoData = {
            "video":videoData,
            "dealType":dealType,
            "price":parseInt(price),
            "bedrooms":parseInt(bedrooms),
            "bathrooms":parseInt(bathrooms),
            "city":city
        }

      sendVideoData(uploadVideoData);
    } else {
      // Handle the case when no video is selected
      console.warn('No video selected');
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <FormControl fullWidth margin="normal">
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleVideoUpload}
        />
        <label htmlFor="video-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Video
          </Button>
        </label>
        {selectedVideo && (
          <TextField
            label="Selected Video"
            value={selectedVideo.name}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
        )}
      </FormControl>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Deal Type</FormLabel>
        <RadioGroup
          row
          aria-label="deal-type"
          name="deal-type"
          value={dealType}
          onChange={(e) => setDealType(e.target.value)}
        >
          <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
          <FormControlLabel value="Buy" control={<Radio />} label="Buy" />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="bedrooms-label">Bedrooms</InputLabel>
            <Select
              labelId="bedrooms-label"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5+">5+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="bathrooms-label">Bathrooms</InputLabel>
            <Select
              labelId="bathrooms-label"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5+">5+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl fullWidth margin="normal">
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        margin="normal"
      >
        Submit
      </Button>
    </Container>
  );
};

export default AdminDashboard;