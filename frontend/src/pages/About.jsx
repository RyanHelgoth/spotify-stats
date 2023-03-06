import React from "react";
import NavBar from "../components/NavBar";
import { Box, Typography, Stack, Link} from "@mui/material";
import data from "../data/aboutPageData.js"
import AboutTable from "../components/AboutTable";

function About() {

 


  return (
    <Box >
      <NavBar />
        <Stack 
          spacing={3}
          justifyContent="center"
          alignItems="center"
          direction="column"
          textAlign="center"
          mt={5}
          mb={7}
          ml={2}
          mr={2}
        >
          <Typography 
            variant="h4"
            color="white"
          >
            Stat Descriptions
          </Typography>
          <AboutTable data={data} />
          <Typography 
            variant="h4"
            color="white"
          >
            Links
          </Typography>
          <Typography 
            variant="body"
            color="white"
          >
            Feel free to send an email <Link 
              href={data.links.email} 
              color="#1DB954" 
            >here</Link> if you have any questions or you would like to send a bug report.
          </Typography>
          <Typography 
            variant="body"
            color="white"
          >
            Click <Link 
              href={data.links.github} 
              color="#1DB954" 
            >here</Link> to see the github repo for this project.
          </Typography>
        </Stack>
        
      
    </Box>
  );
};

export default About;
