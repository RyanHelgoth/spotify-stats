import React from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Stats() {
  let song;
  const location = useLocation();
  

  useEffect(() => {
    if (!location.state) {
      /* 
        Fetch song data when user accesses the stats
        page by typing in the path.
      */
      console.log("manual");
    }
    else {
      console.log("from app");
    }
  });

 
  console.log(location.state);
  

  return (
    <div>
      <NavBar />
      <p>{JSON.stringify(location.state)}</p>
    </div>
  );
};

export default Stats;