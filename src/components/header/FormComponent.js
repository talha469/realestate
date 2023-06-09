import React, { useState, useEffect } from "react";
import { Box, Typography, OutlinedInput } from "@mui/material";
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

const FormComponent = ({ onSubmit, buyMax, rentMax }) => {
  const [rentOrBuy, setRentOrBuy] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.rentOrBuy : "rent";
  });
  const [priceRange, setPriceRange] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.priceRange : [0, 20000];
  });
  const [bedrooms, setBedrooms] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.bedrooms : [];
  });

  const [bathrooms, setBathrooms] = useState(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    return formData ? formData.bathrooms : [];
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

  // Clear cache on page reload
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("formData");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleRentOrBuyChange = (event) => {
    const selectedOption = event.target.value;
    setRentOrBuy(selectedOption);

    if (selectedOption === "rent") {
      setPriceRange([0, rentMax]);
    } else if (selectedOption === "buy") {
      setPriceRange([0, buyMax]);
    }
  };
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleBedroomsChange = (event) => {
    const selectedOptions = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value];
    setBedrooms(selectedOptions);
  };

  const handleBathroomsChange = (event) => {
    const selectedOptions = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value];
    setBathrooms(selectedOptions);
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
            max={rentOrBuy === "buy" ? buyMax : rentMax}
            step={100}
            valueLabelDisplay="auto"
            marks={[
              { value: 0, label: "$0" },
              {
                value: rentOrBuy === "buy" ? buyMax : rentMax,
                label: `$${rentOrBuy === "buy" ? buyMax : rentMax}`,
              },
            ]}
          />
        </Box>

        <Box mt={3} sx={{ width: "200" }}>
          <Typography sx={{ fontWeight: "bold", paddingBottom: "4px" }}>
            Bedroom
          </Typography>
          <FormControl sx={{ minWidth: "200px" }}>
            <Select
              multiple
              value={bedrooms}
              onChange={handleBedroomsChange}
              input={<OutlinedInput label="Bedrooms" />}
              renderValue={(selected) => {
                if (selected.includes(0)) {
                  // Replace the value 0 with "Studio" in the rendered value
                  return selected
                    .filter((value) => value !== 0)
                    .concat("Studio")
                    .join(", ");
                }
                return selected.join(", ");
              }}
            >
              <MenuItem value={0}>Studio</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={3} sx={{ width: "200" }}>
          <Typography sx={{ fontWeight: "bold", paddingBottom: "4px" }}>
            Bathroom
          </Typography>
          <FormControl sx={{ minWidth: "200px" }}>
            <Select
              multiple
              value={bathrooms}
              onChange={handleBathroomsChange}
              displayEmpty
              inputProps={{ "aria-label": "bathrooms" }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={3} sx={{ width: "200" }}>
          <Autocomplete
            inputValue={city}
            onInputChange={handleCityChange}
            options={[
              { label: "Bronx, NY", value: "Bronx, NY" },
              { label: "Brooklyn, NY", value: "Brooklyn, NY" },
              { label: "Manhattan, NY", value: "Manhattan, NY" },
              { label: "Queens, NY", value: "Queens, NY" },
              { label: "Staten Island, NY", value: "Staten Island, NY" },
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
