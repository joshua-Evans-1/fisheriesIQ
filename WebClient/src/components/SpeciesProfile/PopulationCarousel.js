import React from 'react';
import { Box, Card, CardContent, Typography, Skeleton, Table, TableHead, TableCell, TableBody, TableRow, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LengthDistributionChart from './LengthDistributionChart';
import { LineChart } from '@mui/x-charts/LineChart';
import _ from 'lodash';

const PopulationCarousel = ({ rows, loading }) => {
  if (loading) {
    return <Skeleton variant="rectangular" height={600} />;
  }

  return (
    <Box
      sx={{
        padding: 3,
        overflowX: 'scroll', // Horizontal scrolling for the entire carousel
        overflowY: 'visable',
        scrollSnapType: 'x mandatory', // Horizontal snapping for rows
        display: 'flex',
        flexDirection: 'row',
        gap: 3, // Space between the cards
      }}
    >
      {rows.map((row) => {
        const populationTrend = _(row.subRows)
          .groupBy((subRow) => new Date(subRow.SURVEY_DATE).getFullYear())
          .map((surveys, year) => ({
            date: new Date(year, 0, 1),
            population: _.sumBy(surveys, 'TOTAL_CATCH'),
            cpue: _.meanBy(surveys, 'CATCH_CPUE'),
            weight: _.sumBy(surveys, 'WEIGHT'),
          }))
          .sortBy('date')
          .value();

        return (
          <Card
            key={row.WATER_BODY_NAME}
            sx={{
              minWidth: '80vw', // Set the minimum width of each card
              maxWidth: '85vw', // Set the maximum width of each card
              height: 'fit-content', // Adjust height of the card
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              scrollSnapAlign: 'center', // Ensure cards snap into place when scrolling
              '@media (max-width: 600px)': {
                minWidth: '50vw',
                height: '50vh',
              },
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 2,
              }}
            >
              {/* Water Body Name */}
              <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}} >
                {row.WATER_BODY_NAME}
              </Typography>
              {/* Additional lake information */}
              <Link component={RouterLink} to={`/Waterbody/${row.subRows[0]?.ID}`}>Waterbody Info</Link>
              <Typography variant="body2" color="text.secondary">
                County: {row.subRows[0]?.COUNTY_NAME}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nearest Town: {row.subRows[0]?.NEAREST_TOWN}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lake Area: {row.subRows[0]?.LAKE_AREA_GIS_ACRES} acres
              </Typography>
              {/* Population Trend Chart */}
              <Box mt={2}>
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
                    {
                      id: 'CPUE',
                      label: 'Catch Per Unit Effort',
                      dataKey: 'cpue',
                      showMark: false,
                      color: '#2196f3',
                    },
                    {
                      id: 'Weight',
                      label: 'Total Weight',
                      dataKey: 'weight',
                      showMark: false,
                      color: '#4caf50',
                    },
                  ]}
                  width={1250}
                  height={300}
                  margin={{ left: 50 }}
                />
              </Box>

              {/* Length Distribution Chart */}
              <Box mt={2}>
                <LengthDistributionChart row={row} />
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
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default PopulationCarousel;
