import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import BathtubIcon from "@mui/icons-material/Bathtub";

const FormComponent = ({ onSubmit }) => {
  const [rentOrBuy, setRentOrBuy] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.rentOrBuy : "";
  });
  const [priceRange, setPriceRange] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.priceRange : [0, 10000];
  });
  const [bedrooms, setBedrooms] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.bedrooms : "";
  });
  const [bathrooms, setBathrooms] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.bathrooms : "";
  });
  const [city, setCity] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.city : "";
  });


  // Load form data from cache when component mounts
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setRentOrBuy(formData.rentOrBuy);
      setPriceRange(formData.priceRange);
      setBedrooms(formData.bedrooms);
      setBathrooms(formData.bathrooms);
      setCity(formData.city);
    }
  }, []);

  // Update cache when form fields change
  useEffect(
    () => {
      const formData = {
        rentOrBuy,
        priceRange,
        bedrooms,
        bathrooms,
        city,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
    },
    [rentOrBuy, priceRange, bedrooms, bathrooms, city] // Added dependencies
  );

  const handleRentOrBuyChange = (event) => {
    setRentOrBuy(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handleCityChange = (event, value) => {
    setCity(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      rentOrBuy,
      priceRange,
      bedrooms,
      bathrooms,
      city,
    };
    onSubmit(formData);
  };

  return (
    <Box
      sx={{
        background: "white",
        position: "relative",
        padding: "1rem",
        color: "black",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography sx={{ fontWeight: "bold" }}>
          <HandshakeIcon sx={{ position: "relative", top: "7px" }} /> Deal
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="rentOrBuy"
            name="rentOrBuy"
            value={rentOrBuy}
            onChange={handleRentOrBuyChange}
          >
            <FormControlLabel value="rent" control={<Radio />} label="Rent" />
            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
          </RadioGroup>
        </FormControl>

        <Box mt={3}>
          <Typography>Select Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            min={0}
            max={10000}
            step={100}
            valueLabelDisplay="auto"
            marks={[
              { value: 0, label: "$0" },
              { value: 10000, label: "$10000" },
            ]}
          />
        </Box>

        <Box mt={3}>
          <Typography sx={{ fontWeight: "bold", paddingBottom: "4px" }}>
            <LocalHotelIcon />
          </Typography>
          <FormControl sx={{ minWidth: "120px" }}>
            <Select
              value={bedrooms}
              onChange={handleBedroomsChange}
              displayEmpty
              inputProps={{ "aria-label": "bedrooms" }}
            >
              <MenuItem value="">Bedrooms</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={3}>
          <Typography sx={{ fontWeight: "bold", paddingBottom: "4px" }}>
            <BathtubIcon />
          </Typography>
          <FormControl sx={{ minWidth: "120px" }}>
            <Select
              value={bathrooms}
              onChange={handleBathroomsChange}
              displayEmpty
              inputProps={{ "aria-label": "bathrooms" }}
            >
              <MenuItem value="">Bathrooms</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={3}>
          <Autocomplete
            inputValue={city}
            onInputChange={handleCityChange}
            options={[
              { label: "City 1", value: "city1" },
              { label: "City 2", value: "city2" },
              { label: "City 3", value: "city3" },
              // Add more cities as needed
            ]}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                InputProps={{
                  ...params.InputProps,
                  style: { color: "black" },
                }}
              />
            )}
          />
        </Box>

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
