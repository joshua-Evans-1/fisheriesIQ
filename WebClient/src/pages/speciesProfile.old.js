import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Skeleton, Breadcrumbs, Link, IconButton, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchSpeciesTaxData, fetchSpeciesPopulationData } from '../api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import _ from 'lodash';
import { LineChart } from '@mui/x-charts/LineChart';

const SpeciesProfile = () => {
  const { speciesName } = useParams(); // Get the species name from the URL
  const [speciesTaxData, setSpeciesTaxData] = useState(null); // State to store species data
  const [speciesPopulationData, setSpeciesPopulationData] = useState([]); // Array for population data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [page, setPage] = useState(0); // Page state for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page for pagination

  useEffect(() => {
    document.title = speciesName.replace(/_/g, ' ') + " - FisheriesIQ";
  }, [speciesName]);

  useEffect(() => {
    const getSpeciesData = async () => {
      try {
        const taxData = await fetchSpeciesTaxData(speciesName.replace(/_/g, ' ')); // API call
        setSpeciesTaxData(taxData[0]);
        const populationData = await fetchSpeciesPopulationData(taxData[0].common_name);
        console.log(populationData);
        setSpeciesPopulationData(populationData);
        setLoading(false); // Data is fetched, stop loading
      } catch (error) {
        console.error('Error fetching species data:', error);
        setLoading(false); // Stop loading on error
      }
    };

    getSpeciesData();
  }, [speciesName]);

  // Group data by Water Body Name using lodash
  const groupedData = _.groupBy(speciesPopulationData, 'WATER_BODY_NAME');
  const rows = Object.keys(groupedData).map((key) => ({
    WATER_BODY_NAME: key,
    subRows: groupedData[key],
  }));

  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  const LengthDistributionChart = ({ row }) => {
    // Group the population data by year and accumulate counts for each length range
    const lengthDistributionData = _(row.subRows)
      .groupBy(subRow => new Date(subRow.SURVEY_DATE).getFullYear()) // Group by year
      .map((surveys, year) => ({
        year: year, // Use the year for x-axis
        '0_5_INCHES': _.sumBy(surveys, '0_5_INCHES'),
        '6_7_INCHES': _.sumBy(surveys, '6_7_INCHES'),
        '8_9_INCHES': _.sumBy(surveys, '8_9_INCHES'),
        '10_11_INCHES': _.sumBy(surveys, '10_11_INCHES'),
        '12_14_INCHES': _.sumBy(surveys, '12_14_INCHES'),
        '15_19_INCHES': _.sumBy(surveys, '15_19_INCHES'),
        '20_24_INCHES': _.sumBy(surveys, '20_24_INCHES'),
        '25_29_INCHES': _.sumBy(surveys, '25_29_INCHES'),
        '31_34_INCHES': _.sumBy(surveys, '31_34_INCHES'),
        '35_39_INCHES': _.sumBy(surveys, '35_39_INCHES'),
        '40_44_INCHES': _.sumBy(surveys, '40_44_INCHES'),
        '45_49_INCHES': _.sumBy(surveys, '45_49_INCHES'),
        '50_PLUS_INCHES': _.sumBy(surveys, '50_PLUS_INCHES')
      }))
      .sortBy('year') // Sort by year
      .value();
  
    return (
      <Box display="flex" marginTop={2}>
        {/* Length Distribution Chart */}
        <Box flex="0" marginRight={2}>
          <LineChart
            dataset={lengthDistributionData}
            xAxis={[
              {
                id: 'Year',
                dataKey: 'year', // Use 'year' for x-axis
                scaleType: 'point', // Use point scale for discrete years
              },
            ]}
            series={[
              {
                id: '0_5_INCHES',
                label: '0-5 Inches',
                dataKey: '0_5_INCHES',
                showMark: false,
                color: '#f44336',
              },
              {
                id: '6_7_INCHES',
                label: '6-7 Inches',
                dataKey: '6_7_INCHES',
                showMark: false,
                color: '#2196F3',
              },
              {
                id: '8_9_INCHES',
                label: '8-9 Inches',
                dataKey: '8_9_INCHES',
                showMark: false,
                color: '#FFEB3B',
              },
              {
                id: '10_11_INCHES',
                label: '10-11 Inches',
                dataKey: '10_11_INCHES',
                showMark: false,
                color: '#4CAF50',
              },
              {
                id: '12_14_INCHES',
                label: '12-14 Inches',
                dataKey: '12_14_INCHES',
                showMark: false,
                color: '#9C27B0',
              },
              {
                id: '15_19_INCHES',
                label: '15-19 Inches',
                dataKey: '15_19_INCHES',
                showMark: false,
                color: '#FF9800',
              },
              {
                id: '20_24_INCHES',
                label: '20-24 Inches',
                dataKey: '20_24_INCHES',
                showMark: false,
                color: '#8BC34A',
              },
              {
                id: '25_29_INCHES',
                label: '25-29 Inches',
                dataKey: '25_29_INCHES',
                showMark: false,
                color: '#FF5722',
              },
              {
                id: '31_34_INCHES',
                label: '31-34 Inches',
                dataKey: '31_34_INCHES',
                showMark: false,
                color: '#3F51B5',
              },
              {
                id: '35_39_INCHES',
                label: '35-39 Inches',
                dataKey: '35_39_INCHES',
                showMark: false,
                color: '#607D8B',
              },
              {
                id: '40_44_INCHES',
                label: '40-44 Inches',
                dataKey: '40_44_INCHES',
                showMark: false,
                color: '#E91E63',
              },
              {
                id: '45_49_INCHES',
                label: '45-49 Inches',
                dataKey: '45_49_INCHES',
                showMark: false,
                color: '#795548',
              },
              {
                id: '50_PLUS_INCHES',
                label: '50+ Inches',
                dataKey: '50_PLUS_INCHES',
                showMark: false,
                color: '#00BCD4',
              },
            ]}
            width={1250}
            height={300}
            margin={{ left: 50 }}
          />
        </Box>
      </Box>
    );
  };
  

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

  return (
    <Box sx={{ padding: 3 }}>
      {loading ? (
        <>
          <Skeleton width={200} />
          <Skeleton width={200} />
        </>
      ) : (
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            marginBottom: 3,
            width: '100%',
            height: '400px', // Adjust height to fit the displayed SVG image
          }}
        >
          <img
            src={`/assets/images/${speciesTaxData?.scientific_name.replace(/\s+/g, '_')}.svg`}
            alt={`${speciesTaxData?.common_name}`}
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain', // Ensure the image scales correctly
            }}
          />
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: '10%', // Position text at the top transparent area
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
            }}
          >
            {speciesTaxData?.scientific_name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              bottom: '10%', // Position text at the bottom transparent area
              left: '50%',
              transform: 'translate(-50%, 50%)',
              color: 'white',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
            }}
          >
            {speciesTaxData?.common_name}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Classification</Typography>
              <Divider />
              {loading ? (
                <>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </>
              ) : (
                <Breadcrumbs aria-label="breadcrumb">
                  <Link component={RouterLink} to={`/Kingdom/${speciesTaxData?.kingdom}`}>
                    {speciesTaxData?.kingdom}
                  </Link>
                  <Link component={RouterLink} to={`/Phylum/${speciesTaxData?.phylum}`}>
                    {speciesTaxData?.phylum}
                  </Link>
                  <Link component={RouterLink} to={`/Class/${speciesTaxData?.class}`}>
                    {speciesTaxData?.class}
                  </Link>
                  <Link component={RouterLink} to={`/Order/${speciesTaxData?.order}`}>
                    {speciesTaxData?.order}
                  </Link>
                  <Link component={RouterLink} to={`/Family/${speciesTaxData?.family}`}>
                    {speciesTaxData?.family}
                  </Link>
                  <Link component={RouterLink} to={`/Genus/${speciesTaxData?.genus}`}>
                    {speciesTaxData?.genus}
                  </Link>
                  <Typography color="text.primary">{speciesTaxData?.scientific_name}</Typography>
                </Breadcrumbs>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Populations Card with MUI Collapsible Table */}
        <Grid item xs={12}>
          <Card sx={{ minHeight: 250 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Populations
              </Typography>
              <Divider sx={{ marginY: 0 }} />
              {loading ? (
                <>
                  <Skeleton width="50%" />
                  <Skeleton width="70%" />
                  <Skeleton width="60%" />
                </>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Water Body Name</TableCell>
                          <TableCell>County</TableCell>
                          <TableCell>Nearest Town</TableCell>
                          <TableCell>Acreage</TableCell> {/* Add the new column header */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <CollapsibleRow key={row.WATER_BODY_NAME} row={row} />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpeciesProfile;

