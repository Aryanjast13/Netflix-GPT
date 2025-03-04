import React from 'react'

const VideoTitle = ({title,description}) => {
  return (
    <div className="pt-90 px-12 absolute w-screen h-screen aspect-video  text-white bg-gradient-to-l to-black ">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="text-xl w-1/4 ml-3">{description}</p>
      <div className='mt-4'>
        <button className="bg-gray-300 px-8 py-3 rounded-md text-xl font-medium text-black opacity-90">
          Play
        </button>
        <button className="bg-gray-600 px-8 py-3 rounded-md text-xl font-medium ml-3 opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle