import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MapCard from '../components/WaterbodyProfile/MapCard';
import { getLakes } from '../api';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const LakeFinder = () => {
  const [lakeData, setLakeData] = useState([]);
  const [lakeName, setLakeName] = useState('');

  useEffect(() => {
    document.title = "LakeFinder - FisheriesIQ";
  }, []);

  // Function to fetch lake data from the API
  const fetchLakeData = async (name) => {
    if (!name.trim()) {
      setLakeData([]); // Clear lake data when input is empty
      return;
    }

    try {
      const data = await getLakes({ lakeName: name });
      setLakeData(data);
    } catch (error) {
      console.error("Error fetching lake data:", error);
    }
  };

  // Debounced version of the fetch function
  const debouncedFetchLakeData = useCallback(debounce(fetchLakeData, 500), []);

  // Handle input changes and trigger data fetch
  const handleLakeNameChange = (event) => {
    const name = event.target.value;
    setLakeName(name);
    debouncedFetchLakeData(name);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        LakeFinder
      </Typography>
      <Grid container spacing={2}>
        {/* Search Panel */}
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6">Search for a Lake</Typography>
            <TextField
              label="Lake Name"
              value={lakeName}
              onChange={handleLakeNameChange}
              variant="outlined"
              fullWidth
            />
          </Card>
        </Grid>

        {/* Lake Cards */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              padding: 2,
              scrollSnapType: 'x mandatory',
            }}
          >
            {lakeData.length > 0 ? (
              lakeData.map((lake) => (
                <Card
                  key={lake.DOW}
                  sx={{
                    minWidth: '40vw',
                    maxWidth: '45vw',
                    display: 'flex',
                    flexDirection: 'column',
                    scrollSnapAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {lake.LAKE_NAME}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      County: {lake.COUNTY_NAME}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Nearest Town: {lake.NEAREST_TOWN}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Lake Area: {lake.LAKE_AREA_GIS_ACRES} acres
                    </Typography>

                    {/* MapCard */}
                    <Box mt={2}>
                      <MapCard selectedLake={lake} />
                    </Box>

                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={RouterLink}
                        to={`/Waterbody/${lake.DOW}`}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No lakes found. Try searching for a different name.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LakeFinder;
