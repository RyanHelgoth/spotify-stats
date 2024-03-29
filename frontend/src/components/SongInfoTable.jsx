import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { getKeyString, getTimeSigString, getDateFormat, formatDuration} from "../helpers/interpretData.js"

function SongInfoTable(props) {

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData('Album Type', props.song.albumType),
    createData('Duration', formatDuration(props.song.duration)),
    createData('Key', getKeyString(props.stats.musicalKey, props.stats.mode)),
    createData('Loudness', `${props.stats.loudness} dB`),
    createData(getDateFormat(props.song.releasePrecision), props.song.releaseDate), 
    createData('Song Number', `${props.song.songNumber} on disc ${props.song.discNumber}`),
    createData('Tempo', `${props.stats.bpm} BPM`),
    createData('Time Signature', getTimeSigString(props.stats.timeSignature))
  ];   

  return (
    <TableContainer >
      <Table 
        sx={{ 
          minWidth: 200,
          bgcolor: "#212121"
        }} 
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row" sx={{color: "white"}}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{color: "white"}}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongInfoTable;