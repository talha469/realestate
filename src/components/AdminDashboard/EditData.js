import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const EditData = () => {
  const [videosDetails, setVideosDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getData = () => {
    axios
      .get('https://localhost:7027/fetchs3BucketData')
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

  const handleEdit = (id) => {
    console.log(videosDetails);
    console.log('Edit row with ID:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete row with ID:', id);
  };

  const handleShowModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getThumbnailUrl = (videoUrl) => {
    debugger
    // Assuming the video URL is in the format of https://example.com/video.mp4
    // Replace '.mp4' with '.jpg' to get the thumbnail URL
    return videoUrl.replace('.mp4', '.jpg');
  };

  return (
    <Container>
      <h2>Video Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Bathroom</th>
            <th>Bedroom</th>
            <th>Deal</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videosDetails.map((video) => (
            <tr key={video?.videoID}>
               <td>
                <img src={getThumbnailUrl(video?.awsPathKey)} alt="Thumbnail" style={{ width: '100px' }} />
              </td>
              <td>{video.bathrooms}</td>
              <td>{video.bedrooms}</td>
              <td>{video.dealType}</td>
              <td>{video?.price}</td>
              <td>{video?.isSold ? '✔️' : '❌'}</td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(video.videoID)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EditData;
