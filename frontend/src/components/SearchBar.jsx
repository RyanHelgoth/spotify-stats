import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

function SearchBar(props) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = React.useState("");

  // Set search bar text to url query
  React.useEffect(() => {
    const urlQuery = searchParams.get("query");
    if (urlQuery) {
      setQuery(urlQuery);
    }
    else {
      setQuery("");
    }
  }, [searchParams]);

  function updateQuery(event) {
    setQuery(event.target.value);
  };

  async function handleSearch() {
    // Do not send api request if query is only spaces
    if (query.trim() !== "") {
      await props.onSearch(query);
    }
    else {
      // Reset search bar if query is only spaces.
      setQuery("");
    }
  };

  // Allows enter to be used as submit button
  async function handleKeyPress(event) {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  return (
    <TextField
      id="filled-search"
      label="Search Songs"
      type="text"
      variant="outlined"
      value={query}
      onChange={updateQuery}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <IconButton
            // https://stackoverflow.com/a/65197663
            onClick={handleSearch}
            color="inherit"
          >
            <SearchIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        )
      }}
      sx={{
        width: { xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%" },
        "& .MuiInputBase-root": {
          backgroundColor: "#212121",
          color: "white"
        },
        "& .MuiInputLabel-root": {
          color: "white"
        },
        "& label.Mui-focused": {
          color: "white"
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#b3b3b3'
          },
          '&:hover fieldset': {
            borderColor: 'white'
          },
          '&.Mui-focused fieldset': {
            borderColor: "white"
          }
        }
      }}
    />
  );
};

export default SearchBar;
