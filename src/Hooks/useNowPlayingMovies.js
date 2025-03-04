import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constants";



const useNowPlayingMovies = () => {

      const dispatch = useDispatch();
    
    const NowPlayingMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await response.json();
      dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
      NowPlayingMovies();
    }, []);

}

export default useNowPlayingMovies;