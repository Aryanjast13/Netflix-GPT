
import {  useSelector } from 'react-redux';
import useMovieTrailer from '../Hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  
  useMovieTrailer(movieId);
  


  return (
    <div className='w-screen h-screen overflow-hidden'>
      <iframe
        className='w-screen aspect-video'
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&loop=1&&autoplay=1&mute=1"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
      ></iframe>
    </div>
  );
}

export default VideoBackground;



