import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Paper, Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { fetchSpeciesTaxData, fetchSpeciesPopulationData } from '../api';
import HeaderImage from '../components/SpeciesProfile/HeaderImage';
import ClassificationCard from '../components/SpeciesProfile/ClassificationCard';
import PopulationTable from '../components/SpeciesProfile/PopulationTable';
import PopulationCarousel from '../components/SpeciesProfile/PopulationCarousel';

const SpeciesProfile = () => {
  const { speciesName } = useParams();
  const [speciesTaxData, setSpeciesTaxData] = useState(null);
  const [speciesPopulationData, setSpeciesPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = speciesName.replace(/_/g, ' ') + ' - FisheriesIQ';
  }, [speciesName]);

  useEffect(() => {
    const getSpeciesData = async () => {
      try {
        const taxData = await fetchSpeciesTaxData(speciesName.replace(/_/g, ' '));
        setSpeciesTaxData(taxData[0]);
        const populationData = await fetchSpeciesPopulationData(taxData[0].common_name);
        setSpeciesPopulationData(populationData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching species data:', error);
        setLoading(false);
      }
    };
    getSpeciesData();
  }, [speciesName]);

  const groupedData = _.groupBy(speciesPopulationData, 'WATER_BODY_NAME');
  const rows = Object.keys(groupedData).map((key) => ({
    WATER_BODY_NAME: key,
    subRows: groupedData[key],
  }));

  return (
    <Box sx={{ padding: 3 }}>
      {loading ? (
        <>
          <Skeleton width={200} />
          <Skeleton width={200} />
        </>
      ) : (
        <HeaderImage speciesTaxData={speciesTaxData} />
      )}
      <ClassificationCard loading={loading} speciesTaxData={speciesTaxData} /> 
        
      <PopulationCarousel rows={rows} loading={loading} />
      
    </Box>
  );
};

export default SpeciesProfile;
