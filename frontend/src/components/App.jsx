import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "../pages/Search";
import About from "../pages/About";
import Stats from "../pages/Stats";
import TopViews from "../pages/TopViews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/stats/:songID" element={<Stats />} />
      <Route path="/top-viewed-songs" element={<TopViews />} />
    </Routes>
  );
};

export default App;


