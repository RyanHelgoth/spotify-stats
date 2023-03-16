import React from "react";
import { Stack } from "@mui/system";
import { Fade, Pagination, Typography, Box} from "@mui/material";
import NavBar from "../components/NavBar";
import SongList from "../components/SongList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { rankTopSongs } from "../helpers/interpretData.js"

function TopViews() {
  const [songs, setSongs] = React.useState([]);
  const [displayIndices, setDisplayIndices] = React.useState([0, 5]);
  const [loading, setLoading] = React.useState(false);
  const [dbIsEmpty, setDBIsEmpty] = React.useState(false);
  const [error, setError] = React.useState({error: false, title: null, desc: null});

  function handleErrorClose() {
    setError({error: false, title: null, desc: null});
  };

  React.useEffect(() => {
    async function getTopSongs() {
      setSongs([]); // Reset songs so loading animation 
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
          const title = `${data.status} Error: ${data.error.error}`;
          const desc = `Error Description: ${data.error.error_description}`;
          setError({error: true, title: title, desc: desc});
        }
      }
      catch (error) {
        const title = "Error";
        const desc = `Error Description: ${error}`;
        setError({error: true, title: title, desc: desc});
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
      // Waiting on results
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
    {error.error && 
      <Error 
        errorTitle={error.title} 
        errorDesc={error.desc} 
        handleClose={handleErrorClose}

      />
    }
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
      <SongList songs={songs.slice(displayIndices[0], displayIndices[1])}/>
      {displayPagination()}
    </Stack>
    </Box>
  );
};

export default TopViews;
