import React, { useRef, useState } from 'react'
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import './Video.css'

function Video() {

  const[play, setPlay] = useState(false);
  const videoRef = useRef(null); 
  
  const onVideoPress = () => {
    if(play){
      videoRef.current.pause();
      setPlay(false);
    }
    else{
      videoRef.current.play();
      setPlay(true);
    }
  }

  return (
    <div className='video'>
        <video className='video__player'
        onClick={onVideoPress}
        ref={videoRef} 
        loop
        src='https://dtovy3vq4hztk.cloudfront.net/pexels-anastasia-shuraeva-7647339-540x960-24fps (1).mp4'>          
        </video>
        <Footer/>
        <Sidebar/>
    </div>
    
  )
}

export default Video