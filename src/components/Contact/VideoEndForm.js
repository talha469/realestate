import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import "./SendForm.css";

// Styled component for the DialogTitle
const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideosEndForm = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Hi,\nI am interested in this property."
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [experienceRating, setExperienceRating] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [followUpEmail, setFollowUpEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(followUpEmail);

  useEffect(() => {
    let timeout;
    if (isSubmitted) {
      timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      return;
    }
    debugger;
    const formData = {
      name,
      email,
      message,
      role: role === "Other" ? otherRole : role,
      experienceRating,
      recommendation,
      suggestions,
      additionalComments,
      followUpEmail,
    };

    debugger;
    onSubmit(formData);
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="dummy-positioning d-flex">
          <div className="success-icon">
            <div className="success-icon__tip"></div>
            <div className="success-icon__long"></div>
          </div>
          <p className="success-message">Thank you for contacting</p>
        </div>
      ) : (
        <Dialog open={true} onClose={onClose}>
          <StyledDialogTitle>
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </StyledDialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Typography sx={{ fontWeight: "semi-bold", marginTop: "1rem" }}>
                Are you a:
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <RadioGroup
                  row
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <FormControlLabel
                    value="Real estate agent"
                    control={<Radio />}
                    label="Real estate agent"
                  />
                  <FormControlLabel
                    value="Renter/Buyer"
                    control={<Radio />}
                    label="Renter/Buyer"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                {!role && (
                  <FormHelperText error>Please select a role</FormHelperText>
                )}
              </FormControl>

              {role === "Other" && ( // Render the text field if role is "Other"
                <TextField
                  label="Please specify"
                  variant="outlined"
                  value={otherRole}
                  onChange={(e) => setOtherRole(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              )}

              <Typography sx={{ marginTop: "0.5rem" }}>
                On a scale of 1 to 5, how would you rate your apartment finding
                experience through short videos on Proppy?
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <RadioGroup
                  row
                  value={experienceRating}
                  onChange={(e) => setExperienceRating(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Worst"
                  />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="4" control={<Radio />} label="4" />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Excellent"
                  />
                </RadioGroup>
              </FormControl>

              <Typography sx={{ marginTop: "1rem" }}>
                Would you recommend Proppy to your friends who are looking for
                apartments?
              </Typography>
              <FormControl component="fieldset" margin="normal">
                <RadioGroup
                  row
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  required
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel
                    value="Maybe"
                    control={<Radio />}
                    label="Maybe"
                  />
                </RadioGroup>
              </FormControl>

              <Typography sx={{ marginTop: "1rem" }}>
                Any new features or improvements you would like to suggest?
              </Typography>

              <TextField
                variant="outlined"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                tyle={{ display: "block" }}
              />

              <Typography sx={{ marginTop: "1rem" }}>
                Is there anything else you would like to share with us?
              </Typography>
              <TextField
                variant="outlined"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />

              <Typography sx={{ marginTop: "1rem" }}>
              Please enter your email address if you would like us to follow up
              </Typography>
              <TextField
                variant="outlined"
                value={followUpEmail}
                onChange={(e) => setFollowUpEmail(e.target.value)}
                fullWidth
                margin="normal"
                error={followUpEmail.trim() !== "" && !isValidEmail}
                helperText={
                  followUpEmail.trim() !== "" && !isValidEmail
                    ? "Please enter a valid email address"
                    : ""
                }
                sx={{ whiteSpace: "nowrap" }}
              />

              <DialogActions>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VideosEndForm;
