import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
           - Main Container
             - Video Background 
             - Video Titile
           - Secondary container
             - movie list * n
               -  movie cards * n
          
      
       */}
    </div>
  );
};

export default Browse;
