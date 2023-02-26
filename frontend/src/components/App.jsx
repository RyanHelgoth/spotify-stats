import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "../pages/Search";
import About from "../pages/About";
import Stats from "../pages/Stats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/stats/:songID" element={<Stats />} />
    </Routes>
  );
};

export default App;


