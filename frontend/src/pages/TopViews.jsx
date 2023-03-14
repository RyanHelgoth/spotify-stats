import React from "react";
import { Stack } from "@mui/system";
import { Fade, Pagination, Typography, Box} from "@mui/material";
import NavBar from "../components/NavBar";
import SearchResults from "../components/SearchResults";
import Loading from "../components/Loading";
import { rankTopSongs } from "../helpers/interpretData.js"

function TopViews() {
  const [songs, setSongs] = React.useState([]);
  const [displayIndices, setDisplayIndices] = React.useState([0, 5]);
  const [loading, setLoading] = React.useState(false);
  const [dbIsEmpty, setDBIsEmpty] = React.useState(false);

  React.useEffect(() => {
    async function getTopSongs() {
      setSongs([]); // Reset songs so loading animation shows after first search
      setLoading(true);
      const PATH = "api/top-viewed-songs";
      const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH);
      
      try {
        const response = await fetch(URL);
        const data = await response.json();
        if (response.ok) {
          if (data.songs.length !== 0) {
            const rankedSongs = rankTopSongs(data.songs);
            setSongs(rankedSongs);
          }
          else {
            setDBIsEmpty(true);
          }
        }
        else {
          alert(`${data.status} Error: ${data.error.error}\n` +
          `Error Description: ${data.error.error_description}`);
        }
      }
      catch (error) {
        alert(`Error: ${error}`);
      }
      finally {
        setLoading(false);
      }
    };

    getTopSongs();
  }, []);

  // Sets indicies representing the start and end of sublist of songs to display.
  function handlePageChange(event, page) {
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
                borderColor: "white",
                minWidth: {xs: "1px", sm: "32px"},
              },
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
      mb="5vh"
    >
      <Typography 
        variant="h5" 
        color="white" 
        ml={2} 
        mr={2}
        sx={{width: {xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%"}}}
      >
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
