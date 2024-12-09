import React, { useState } from 'react';
import { TableRow, TableCell, TableHead, TableBody, Table, IconButton, Collapse, Box, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import LengthDistributionChart from './LengthDistributionChart';
import { LineChart } from '@mui/x-charts/LineChart';


const CollapsibleRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  
    // Group data by year and sum population, cpue, and weight for the same year
    const populationTrend = _(row.subRows)
      .groupBy(subRow => new Date(subRow.SURVEY_DATE).getFullYear()) // Group by year
      .map((surveys, year) => ({
        date: new Date(year, 0, 1), // Create a Date object for January 1st of the year
        population: _.sumBy(surveys, 'TOTAL_CATCH'), // Sum the total catch for the year
        cpue: _.meanBy(surveys, 'CATCH_CPUE'), // Average CPUE for the year
        weight: _.sumBy(surveys, 'WEIGHT'), // Sum the total weight for the year
      }))
      .sortBy('date') // Sort by date to ensure correct order
      .value();
  
    const firstSubRow = row.subRows[0];
  
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.WATER_BODY_NAME}
          </TableCell>
          <TableCell>{firstSubRow.COUNTY_NAME}</TableCell>
          <TableCell>{firstSubRow.NEAREST_TOWN}</TableCell>
          <TableCell>{firstSubRow.LAKE_AREA_GIS_ACRES}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Survey Details
                </Typography>
                {/* Flex container for the charts */}
                <Box display="flex" flexDirection="column" marginTop={2}>
                  {/* Row for population, cpue, and weight charts */}
                  <Box display="flex" marginBottom={2}>
                    <Box flex="0" marginRight={2}>
                      <LineChart
                        dataset={populationTrend}
                        xAxis={[
                          {
                            id: 'Years',
                            dataKey: 'date',
                            scaleType: 'time',
                            valueFormatter: (date) => date.getFullYear().toString(),
                          },
                        ]}
                        series={[
                          {
                            id: 'Population',
                            label: 'Surveyed Population',
                            dataKey: 'population',
                            showMark: false,
                            color: '#f44336',
                          },
                        ]}
                        width={400}
                        height={300}
                        margin={{ left: 50 }}
                      />
                    </Box>
  
                    <Box flex="0" marginRight={2}>
                      <LineChart
                        dataset={populationTrend}
                        xAxis={[
                          {
                            id: 'Years',
                            dataKey: 'date',
                            scaleType: 'time',
                            valueFormatter: (date) => date.getFullYear().toString(),
                          },
                        ]}
                        series={[
                          {
                            id: 'CPUE',
                            label: 'Catch CPUE',
                            dataKey: 'cpue',
                            showMark: false,
                            color: '#f44336',
                          },
                        ]}
                        width={400}
                        height={300}
                        margin={{ left: 50 }}
                      />
                    </Box>
  
                    <Box flex="0">
                      <LineChart
                        dataset={populationTrend}
                        xAxis={[
                          {
                            id: 'Years',
                            dataKey: 'date',
                            scaleType: 'time',
                            valueFormatter: (date) => date.getFullYear().toString(),
                          },
                        ]}
                        series={[
                          {
                            id: 'Weight',
                            label: 'Avg Weight',
                            dataKey: 'weight',
                            showMark: false,
                            color: '#f44336',
                          },
                        ]}
                        width={400}
                        height={300}
                        margin={{ left: 50 }}
                      />
                    </Box>
                  </Box>
  
                  {/* Length Distribution Chart below */}
                  <Box>
                    <LengthDistributionChart row={row} />
                  </Box>
                </Box>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Total Catch</TableCell>
                      <TableCell>Catch CPUE</TableCell>
                      <TableCell>Survey Type</TableCell>
                      <TableCell>Weight (kg)</TableCell>
                      <TableCell>Gear</TableCell>
                      <TableCell>Survey Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.subRows.map((subRow, index) => (
                      <TableRow key={index}>
                        <TableCell>{subRow.TOTAL_CATCH}</TableCell>
                        <TableCell>{subRow.CATCH_CPUE}</TableCell>
                        <TableCell>{subRow.SURVEY_TYPE}</TableCell>
                        <TableCell>{subRow.WEIGHT}</TableCell>
                        <TableCell>{subRow.GEAR}</TableCell>
                        <TableCell>{subRow.SURVEY_DATE}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
};

export default CollapsibleRow;
