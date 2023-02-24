import React from "react";
import SearchBar from "./SearchBar";
import SubmitButton from "./SubmitButton";
import Grid from '@mui/material/Grid';

function SearchForm() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={2}
      sx={{m: 5}}
    >
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item>
        <SubmitButton />
      </Grid>
    </Grid>
  );
};

export default SearchForm;