import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';


// https://stackoverflow.com/questions/52911169/how-to-change-the-border-color-of-mui-textfield
function SearchBar() {
    return (
        <TextField
            id="filled-search"
            label="Song Name"
            type="text"
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <IconButton
                        aria-label="toggle password visibility"
                        //TODO implment button functionality 
                        // and enter button functionality
                        // https://stackoverflow.com/a/65197663
                        //onClick={() => setValue("")}
                    >    
                        <SearchIcon sx={{color: "white"}}/>
                    </IconButton>
                )
            }}
            
            sx={{
                width: {xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%"},
                "& .MuiInputBase-root": {  
                    backgroundColor: "#b3b3b3",
                    color: "white"
                },
                "& .MuiInputBase-root:hover": {
                    boxShadow: 3
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
