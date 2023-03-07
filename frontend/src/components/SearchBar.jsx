import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';


// https://stackoverflow.com/questions/52911169/how-to-change-the-border-color-of-mui-textfield
function SearchBar(props) {
    const [searchParams, setSearchParams] = useSearchParams();
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
        // Do not send request if query is only spaces
        if (query.trim() !== "" ) {
            await props.onSearch(query);
        }
        else {
            // TODO add warning message
            console.log("bruh");
        }
    };

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
                width: {xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%"},
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
