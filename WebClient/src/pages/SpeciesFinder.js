import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SpeciesSearch from '../components/SpeciesFinder/SpeciesSearch';
import { getTaxonomyData } from '../api'; // Adjust the path accordingly

const SpeciesFinder = () => {
  const [taxonomyData, setTaxonomyData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    common_name: null,
    scientific_name: null,
    kingdom: null,
    phylum: null,
    class: null,
    order: null,
    family: null,
    genus: null,
    species: null,
    origin: null,
  });

  useEffect(() => {
    document.title =  "SpeciesFinder - FisheriesIQ";
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTaxonomyData();
      setTaxonomyData(data);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        SpeciesFinder
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SpeciesSearch
            taxonomyData={taxonomyData}  // Pass the full data array to the search component
            setSelectedFilters={setSelectedFilters}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpeciesFinder;
