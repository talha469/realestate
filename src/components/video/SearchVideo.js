import React from 'react'
import { useParams } from 'react-router-dom';

const SearchVideo = () => {
    const { id } = useParams();
  return (
    <div> 
        {id}
    </div>
  )
}

export default SearchVideo