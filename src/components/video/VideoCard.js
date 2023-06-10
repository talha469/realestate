import React from 'react'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack} from '@mui/system'
import Sidebar from '../sidebar/Sidebar'
import Footer from '../footer/Footer'

const VideoCard = () => {
  return (
    <Box>
        <Stack>
            <ReactPlayer controls url={`https://dtovy3vq4hztk.cloudfront.net/pexels-anastasia-shuraeva-7647339-540x960-24fps (1).mp4`}/>
            <Sidebar/>
            <Footer/>
        </Stack>
    </Box>
  )
}

export default VideoCard

// return (
  //   <div className='video'>
  //       <video className='video__player'
  //       onClick={onVideoPress}
  //       ref={videoRef} 
  //       loop
  //       src='https://dtovy3vq4hztk.cloudfront.net/pexels-anastasia-shuraeva-7647339-540x960-24fps (1).mp4'>          
  //       </video>
  //       <Footer/>
  //       <Sidebar/>
  //   </div>