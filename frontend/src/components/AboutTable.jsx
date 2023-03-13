import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function AboutTable(props) {
  
  function createData(name, value) {
    return { name, value };
  }

  // Create table rows based on data in src/data/aboutPageData.js
  const rows = [...props.data.descriptions].map((description) => {
    return createData(description.name, description.desc);
  })

  return (
    <TableContainer sx={{maxWidth: 1000}}>
      <Table 
        sx={{ 
          bgcolor: "#212121",
          borderRadius: 1
        }} 
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell align="left" component="th" scope="row" sx={{color: "white"}}>
                {row.name}
              </TableCell>
              <TableCell align="left" sx={{color: "white"}}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AboutTable;