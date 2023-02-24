import * as React from 'react';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

// https://stackoverflow.com/questions/52911169/how-to-change-the-border-color-of-mui-textfield
function SearchBar() {
    return (
        <TextField
            id="filled-search"
            label="Song Name"
            type="text"
            variant="outlined"
            
            sx={{
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
