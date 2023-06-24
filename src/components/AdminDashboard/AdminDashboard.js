import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Messages from './Messages'
import 'react-toastify/dist/ReactToastify.css';
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
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import EditData from './EditData';

const UploadVideoForm = ({ handleSidebarClose, uploadInProcess }) => {
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
    console.log(uploadVideoData);
    uploadInProcess(true);
    // Send video data to your C# API   
    axios
      .post('https://visheshmanwani-001-site1.itempurl.com/AdminDashboard', uploadVideoData)
      .then((response) => {
        toast.success('Video uploaded successfully');
        console.log('Video data sent successfully:', response.data);
        uploadInProcess(false);
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
        video: videoData,
        dealType: dealType,
        price: parseInt(price),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        city: city,
      };

      sendVideoData(uploadVideoData);
    } else {
      // Handle the case when no video is selected
      console.warn('No video selected');
    }
  };

  return (
    <Container maxWidth="sm">
      <FormControl fullWidth margin="normal">
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleVideoUpload}
        />
        <label htmlFor="video-upload">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
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
              <MenuItem value="0">Studio</MenuItem>
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

        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="bathrooms-label">City</InputLabel>
            <Select
              labelId="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <MenuItem value="Bronx, NY">Bronx, NY</MenuItem>
              <MenuItem value="Brooklyn, NY">Brooklyn, NY</MenuItem>
              <MenuItem value="Manhattan, NY">Manhattan, NY</MenuItem>
              <MenuItem value="Queens, NY">Queens, NY</MenuItem>
              <MenuItem value="Staten Island, NY">Staten Island, NY</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        margin="normal"
        style={{ marginTop: '2rem' }}
      >
        Submit
      </Button>
    </Container>
  );
};

const AdminDashboard = ({uploadInProcess}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('upload'); // 'upload' or 'messages'

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenUploadForm = () => {
    setCurrentComponent('upload');
    handleSidebarClose();
  };

  const handleOpenMessages = () => {
    setCurrentComponent('messages');
    handleSidebarClose();
  };

  const handleEditData = () => {
    setCurrentComponent('editdata');
    console.log(currentComponent)
    handleSidebarClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <ToastContainer />
      <Drawer anchor="left" open={isSidebarOpen} onClose={handleSidebarClose}>
        <List>
          <ListItem button onClick={handleOpenUploadForm}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Video" />
          </ListItem>
          <ListItem button onClick={handleOpenMessages}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        <ListItem button onClick={handleEditData}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Videos" />
          </ListItem>
        </List>
      </Drawer>
      {currentComponent === 'upload' ? (
        <UploadVideoForm handleSidebarClose={handleSidebarClose} uploadInProcess={uploadInProcess} />
      ) : currentComponent === 'editdata' ? <EditData/> :(
        <Messages />
      )}
    </div>
  );
};

export default AdminDashboard;
