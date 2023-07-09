import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import './Analytics.css';

const Analytics = () => {
  const [totalVideosRendered, setTotalVideosRendered] = useState(0);
  const [totalFilterSearched, setTotalFilterSearched] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://visheshmanwani-001-site1.itempurl.com/AdminDashboard')
      .then((response) => {
        debugger
        setTotalVideosRendered(response.data.totalVideosRendered);
        setTotalFilterSearched(response.data.totalFilterApplied);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Box mt={4} mx="auto" maxWidth={900}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" className="card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Main Page Interacted
              </Typography>
              <Typography variant="h4" component="div">
                {totalVideosRendered}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" className="card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filters Searched
              </Typography>
              <Typography variant="h4" component="div">
                {totalFilterSearched}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
