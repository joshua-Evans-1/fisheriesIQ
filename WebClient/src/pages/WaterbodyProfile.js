import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { getLakeByID } from '../api';
import MapCard from '../components/WaterbodyProfile/MapCard';
import LakeDetailsCard from '../components/WaterbodyProfile/LakeDetailsCard';

const WaterbodyProfile = () => {
  const { waterBodyId } = useParams();
  const navigate = useNavigate();
  const [lakeData, setLakeData] = useState(null);
  const [surveyData, setSurveyData] = useState([]);
  const [uniqueSpecies, setUniqueSpecies] = useState([]);
  const [speciesMap, setSpeciesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLakeData = async () => {
      try {
        const data = await getLakeByID(waterBodyId);
        setLakeData(data[0]);
        setSurveyData(data);
        console.log(data);
        // Extract unique species with their scientific names
        const speciesMap = {};
      data.forEach((survey) => {
        if (survey.SPECIES_CODE && survey.SCIENTIFIC_NAME) {
          speciesMap[survey.SPECIES_CODE] = survey.SCIENTIFIC_NAME;
        }
      });
      
      setUniqueSpecies(Object.keys(speciesMap));
      setSpeciesMap(speciesMap); 
      } catch (error) {
        console.error("Error fetching lake data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLakeData();
  }, [waterBodyId]);

  useEffect(() => {
    if (lakeData) {
      document.title = `${lakeData.WATER_BODY_NAME} - FisheriesIQ`;
    }
  }, [lakeData]);

  // Group surveys by SURVEY_DATE
  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.SURVEY_DATE).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  const surveysByDate = groupByDate(surveyData);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!lakeData) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">No lake data found for ID: {waterBodyId}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Lake Information */}
      <Typography variant="h4" gutterBottom>
  {lakeData.WATER_BODY_NAME} ({lakeData.ID})
</Typography>

<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    marginBottom: 3,
    width: '100%', // Ensure the container spans the full width
    '@media (max-width: 600px)': {
      flexDirection: 'column', // Stack cards vertically on small screens
    },
  }}
>
  <Box sx={{ flex: 1 }}>
    <LakeDetailsCard selectedLake={lakeData} />
  </Box>
  <Box sx={{ flex: 1 }}>
    <MapCard selectedLake={lakeData} />
  </Box>
</Box>

      {/* Unique Species Card */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          marginBottom: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Species Found in {lakeData.WATER_BODY_NAME}:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {uniqueSpecies.length > 0 ? (
              uniqueSpecies.map((species, index) => {
                const scientificName = speciesMap[species];
                return (
                  <Chip
                    key={index}
                    label={species}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      if (scientificName) {
                        navigate(`/Species/${scientificName.replace(/ /g, '_')}`);
                      } else {
                        console.warn(`No scientific name found for species: ${species}`);
                      }
                    }}
                  />
                );
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                No species data available.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Surveys Carousel */}
      <Typography variant="h5" gutterBottom>
        Surveys
      </Typography>
      <Box
        sx={{
          padding: 3,
          overflowX: 'scroll', // Horizontal scrolling
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          scrollSnapType: 'x mandatory',
        }}
      >
        {Object.entries(surveysByDate).map(([date, surveys]) => (
          <Card
            key={date}
            sx={{
              minWidth: '80vw',
              maxWidth: '85vw',
              scrollSnapAlign: 'center',
              borderRadius: 2,
              boxShadow: 2,
              '@media (max-width: 600px)': {
                minWidth: '50vw',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Survey Date: {date}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Survey Type: {surveys[0]?.SURVEY_TYPE || 'Unknown'}
              </Typography>

              {/* Table for Survey Data */}
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Species</TableCell>
                      <TableCell align="right">Catch (CPUE)</TableCell>
                      <TableCell align="right">Total Catch</TableCell>
                      <TableCell align="right">Weight (lbs)</TableCell>
                      <TableCell align="right">Gear</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {surveys.map((survey, index) => (
                      <TableRow key={index}>
                        <TableCell>{survey.SPECIES_CODE}</TableCell>
                        <TableCell align="right">{survey.CATCH_CPUE}</TableCell>
                        <TableCell align="right">{survey.TOTAL_CATCH}</TableCell>
                        <TableCell align="right">{survey.WEIGHT}</TableCell>
                        <TableCell align="right">{survey.GEAR}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default WaterbodyProfile;
