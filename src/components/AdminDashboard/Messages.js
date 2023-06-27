import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CloudDownload, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Messages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get('https://visheshmanwani-001-site1.itempurl.com/ContactForm') // Replace with your API endpoint
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  const handleDownload = () => {
    setIsLoading(true);
    axios
      .get('https://visheshmanwani-001-site1.itempurl.com/ContactForm') // Replace with your API endpoint
      .then((response) => {
        // Convert response data to Excel file and download
        downloadExcelFile(response.data);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  const downloadExcelFile = (data) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert the workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // Create a Blob from the Excel buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Generate a temporary download link
    const url = URL.createObjectURL(blob);

    // Create an anchor element for the download link
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx');

    // Programmatically click the link to start the download
    link.click();

    // Cleanup by revoking the URL object
    URL.revokeObjectURL(url);
  };

  const handleSnackbarClose = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Messages</h1>
      <Button
        style={{
          backgroundColor: '#3f51b5',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1a237e',
          },
        }}
        variant="contained"
        startIcon={<CloudDownload />}
        onClick={handleDownload}
        disabled={isLoading}
      >
        Download
      </Button>
      {isLoading && <CircularProgress />}
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <div>
          {isSuccess ? (
            <span>
              <CheckCircle style={{ marginRight: '0.5rem' }} />
              Download complete
            </span>
          ) : (
            <span>
              <ErrorIcon style={{ marginRight: '0.5rem' }} />
              Error downloading file
            </span>
          )}
        </div>
      </Snackbar>
      
      <TableContainer component={Paper} style={{ marginRight: '3rem', marginTop:'3rem'}}>
        <Table size="small" aria-label="Messages Table" >
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Bedroom</TableCell>
              <TableCell align="right">Bathroom</TableCell>
              <TableCell align="right">Deal</TableCell>
              {/* Add more table headers based on your SQL data structure */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.message}</TableCell>
                <TableCell align="right">{item.city}</TableCell>
                <TableCell align="right">{item.address}</TableCell>
                <TableCell align="right">{item.bedrooms}</TableCell>
                <TableCell align="right">{item.bathrooms}</TableCell>
                <TableCell align="right">{item.dealType}</TableCell>
                {/* Add more table cells based on your SQL data structure */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </div>
  );
};

export default Messages;
