import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getKeyString, getTimeSigString, getDateFormat, formatDuration} from "../helpers/interpretData.js"


function AboutTable(props) {
  function createData(name, value) {
    return { name, value };
  }

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