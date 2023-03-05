import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Search from "../pages/Search";
import About from "../pages/About";
import Stats from "../pages/Stats";
import TopViews from "../pages/TopViews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/stats/:songID" element={<Stats />} />
      <Route path="/top-songs" element={<TopViews />} />
    </Routes>
  );
};

export default App;


