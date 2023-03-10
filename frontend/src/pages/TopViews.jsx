import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { rankTopSongs } from "../helpers/interpretData.js"
import { Stack } from "@mui/system";
import { Pagination, Typography } from "@mui/material";
import { Collapse, Divider, Fade, Grow, Slide, Zoom } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";
import Loading from "../components/Loading";



function TopViews() {

  const [songs, setSongs] = React.useState([]);
  const [displayIndices, setDisplayIndices] = React.useState([0, 5]);
  const [loading, setLoading] = React.useState(false);
  const [dbIsEmpty, setDBIsEmpty] = React.useState(false);

  React.useEffect(() => {
    async function getTopSongs() {
      // Reset songs so loading animation shows after first search
      setSongs([]); 
      setLoading(true);
      const PATH = "api/top-viewed-songs";
      const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH);
      const response = await fetch(URL);
      const songs = await response.json();
      if (songs.length !== 0) {
        const rankedSongs = rankTopSongs(songs);
        setSongs(rankedSongs);
      }
      else {
        setDBIsEmpty(true);
      }
      setLoading(false);
    };

    getTopSongs();
  }, []);


  function handlePageChange(event, page) {
    console.log(page)
    const start = (page - 1) * 5;
    const end = page * 5;
    const indicies = [start, end];
    setDisplayIndices(indicies);
  }

  function displayPagination() {
    if (songs.length !== 0 && !loading) {
      // Results done loading
      return (
        <Fade in unmountOnExit timeout={350}>
          <Pagination 
            count={Math.ceil(songs.length/5)} 
            variant="text"
            shape="rounded"
            size="medium"
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                borderColor: "white"
              }
            }}
          />
        </Fade>
      );
    }
    else if (songs.length === 0 && loading) {
      // Waiting on search results
      return (
        <Loading height={"30vh"}/>
      );
    }
    else {
      // First load of page
      return null;
    }
  }
 
  return (
    <Box>
    <NavBar />
    <Stack 
      width="100%" 
      spacing={4} 
      alignItems="center"
      textAlign="center"
      mb="7%"
      >
      
      <Typography variant="h5" color="white" ml={2} mr={2}>
        {
          dbIsEmpty ? 
          "No Song Stats Have Been Viewed Yet This Month" : 
          "Top Viewed Song Stats This Month"
        }
      </Typography>
      <SearchResults songs={songs.slice(displayIndices[0], displayIndices[1])}/>
      {displayPagination()}
    </Stack>
    </Box>
  );
};

export default TopViews;
