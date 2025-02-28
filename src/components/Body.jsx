import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { BrowserRouter, Route, Routes } from "react-router";

const Body = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Body;
