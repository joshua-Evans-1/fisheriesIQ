import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import CollapsibleRow from './CollapsibleRow';

const PopulationTable = ({ rows, loading }) => (
  <TableContainer component={Paper}>
    <Table aria-label="population table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Water Body Name</TableCell>
          <TableCell>County Name</TableCell>
          <TableCell>Nearest Town</TableCell>
          <TableCell>Lake Area (Acres)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <Skeleton height={400} />
        ) : (
          rows.map((row) => <CollapsibleRow key={row.WATER_BODY_NAME} row={row} />)
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PopulationTable;
