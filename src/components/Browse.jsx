import React from "react";
import Header from "./Header";

const Browse = () => {
  return (
    <div>
      <Header />
      <div className="w-screen">
        <iframe
          className="w-screen h-screen aspect-auto"
          src="https://www.youtube.com/embed/hXzcyx9V0xw?&loop=1&autoplay=1&mute=1&"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Browse;
