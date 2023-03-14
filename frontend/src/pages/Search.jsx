import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Loading from "../components/Loading";
import { Stack } from "@mui/system";
import { Fade, Pagination, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { extractSongs } from "../helpers/extractData.js"

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [songs, setSongs] = React.useState([]);
  const [displayIndices, setDisplayIndices] = React.useState([0, 5]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const query = searchParams.get("query");

    if (query !== null) {
      async function getSongs(query) {
        setSongs([]); // Reset songs so loading animation shows after first search
        setLoading(true);
        const PATH = "api/tracks";
        const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH + "?track-name=" + query);

        try {
          const response = await fetch(URL);
          const data = await response.json();
          if (response.ok) {
            const extractedSongs = extractSongs(data);
            setSongs(extractedSongs);
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
          handlePageChange(null, 1); // Reset page position on new query
        }
      };
      
      getSongs(query);
    }
    else {
      // If no query, dont display any songs
      setSongs([]);
    }
  }, [searchParams]);

  function setQuery(query) {
    setSearchParams({query: query});
  }

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
            onChange={handlePageChange}
            size="medium"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                borderColor: "white",
                minWidth: {xs: "1px", sm: "32px"},
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
      mb="5vh"
    >
      <SearchBar onSearch={setQuery}/>
      <SearchResults songs={songs.slice(displayIndices[0], displayIndices[1])}/>
      {displayPagination()}
    </Stack>
    </Box>
  );
};

export default Search;
