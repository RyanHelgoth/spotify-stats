import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "../pages/Search";
import About from "../pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;


