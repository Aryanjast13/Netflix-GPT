import{ useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/Constants';
import { addTrailerVideo } from '../utils/movieSlice';

const useMovieTrailer = (movieId) => {
  
  const dispatch = useDispatch();

  //fetch video trailer
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    if (!json.results) return;

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const Trailer = filterData.length ? filterData[0] : json.results[0];
    
    dispatch(addTrailerVideo(Trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
}

export default useMovieTrailer