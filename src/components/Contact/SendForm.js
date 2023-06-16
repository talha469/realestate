import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

// Styled component for the DialogTitle
const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SendForm = ({ onClose, onSubmit, videoData }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [selectedVideoData, setSelectedVideoData] = useState('');  
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        name,
        email,
        message,
        videoID,
        awspath,dealType, price, bedrooms, bathrooms, zip, city, googleMapAddress, isPlaying
      };
      onSubmit(formData);
      setName('');
      setEmail('');
      setMessage('');
      setSubmissionSuccess(true);
    };
  
    const { videoID, awspath, dealType, price, bedrooms, bathrooms, zip, city, googleMapAddress, isPlaying } = videoData;
  
    return (
      <Dialog open={true} onClose={onClose}>
        <StyledDialogTitle>
          Contact us
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
  
            <TextField
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
  
            <TextField
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
  
          <Typography sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <p style={{ marginRight: '1rem' }}>
              <strong>Bathrooms:</strong> {bathrooms}
            </p>
            <p style={{ marginRight: '1rem' }}>
              <strong>Bedrooms:</strong> {bedrooms}
            </p>
            <p style={{ marginRight: '1rem' }}>
              <strong>City:</strong> {city}
            </p>
            <p style={{ marginRight: '1rem' }}>
              <strong>Deal Type:</strong> {dealType}
            </p>
            <p style={{ marginRight: '1rem' }}>
              <strong>Price:</strong> ${price}
            </p>
            <p style={{ marginRight: '1rem' }}>
              <strong>Google Location:</strong> {googleMapAddress}
            </p>
          </Typography>

  
            <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
export default SendForm;
