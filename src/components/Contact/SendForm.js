import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        name,
        email,
        message,
      };
      onSubmit(formData);
      setName('');
      setEmail('');
      setMessage('');
    };
  
    const { videoID, awspath, dealType, price, bedrooms, bathrooms, zip, city, googleMapAddress, isPlaying } = videoData;
  
    return (
      <Dialog open={true} onClose={onClose}>
        <StyledDialogTitle>
          Form Component
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
  
            <p>
              Number of bathrooms: {bathrooms}, Number of bedrooms: {bedrooms}, City: {city},
              Deal Type: {dealType}, Price: ${price}, Google Location: {googleMapAddress}
            </p>
  
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
