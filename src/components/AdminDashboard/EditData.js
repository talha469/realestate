import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Button, TablePagination } from '@mui/material';

const EditData = () => {
  const [videosDetails, setVideosDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getData = () => {
    axios
      .get('https://visheshmanwani-001-site1.itempurl.com/fetchs3BucketData')
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

  const handleEdit = (videoID) => {
    if(window.confirm("Are you sure you want to update this record")){
      axios.delete(`https://visheshmanwani-001-site1.itempurl.com/sold/${videoID}`)
      .then((result) => {
        if(result.status  === 200){
          toast.success('Record Updated');
          getData();
        }
      }) 
      .catch ((error) => {
        toast.error(error)
      }) 
  }
  };

  const handleDelete = (videoID) => {
    if(window.confirm("Are you sure you want to delete this record")){
      axios.delete(`https://visheshmanwani-001-site1.itempurl.com/AdminDashboard/${videoID}`)
      .then((result) => {
        if(result.status  === 200){
          toast.success('Record Deleted');
          getData();
        }
      }) 
      .catch ((error) => {
        toast.error(error)
      }) 
  }
  };

  const getThumbnailUrl = (videoUrl) => {
    // Assuming the video URL is in the format of https://example.com/video.mp4
    // Replace '.mp4' with '.jpg' to get the thumbnail URL
    return videoUrl.replace('.mp4', '.jpg');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, videosDetails.length - page * rowsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead  sx={{ fontWeight: 'bold' }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Bathroom</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Bedroom</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Deal</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Sold</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? videosDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : videosDetails
              ).map((video) => (
                <TableRow key={video?.videoID}>
                  <TableCell>
                    <img src={getThumbnailUrl(video?.awsPathKey)} alt="Thumbnail" style={{ width: '100px' }} />
                  </TableCell>
                  <TableCell>{video.bathrooms}</TableCell>
                  <TableCell>{video.bedrooms}</TableCell>
                  <TableCell>{video.dealType}</TableCell>
                  <TableCell>{video?.price}</TableCell>
                  <TableCell>{video?.city}</TableCell>
                  <TableCell>{video?.isSold ? '✔️' : '❌'}</TableCell>
                  <TableCell>
                    <Button sx={{margin:'10px'}} variant="contained" color="primary" onClick={() => handleEdit(video.videoID)}>
                      Sold
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(video.videoID)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={videosDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default EditData;
