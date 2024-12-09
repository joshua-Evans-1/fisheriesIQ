import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTaxonomyData } from '../api';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

const groupByFamily = (speciesData) => {
  return speciesData.reduce((acc, species) => {
    if (!acc[species.family]) {
      acc[species.family] = [];
    }
    acc[species.family].push(species);
    return acc;
  }, {});
};

const ListofSpecies = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Species List - FisheriesIQ";
  });

  useEffect(() => {
    const fetchSpecies = async () => {
      const data = await getTaxonomyData();
      setSpeciesData(data);
      setLoading(false);
    };

    fetchSpecies();
  }, []);

  const families = groupByFamily(speciesData);

  return (
    <Box
      sx={{
        padding: 2,
        height: '100vh', 
        overflowY: 'scroll', 
        scrollSnapType: 'y mandatory',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        Object.entries(families).map(([family, speciesList]) => (
          <Box
            key={family}
            sx={{
              scrollSnapAlign: 'start', 
              marginBottom: 4,
            }}
          >
            {/* Family Title */}
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {family}
            </Typography>

            {/* Row for family */}
            <Box
              sx={{
                overflowX: 'scroll',
                scrollSnapType: 'x mandatory', 
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 1,
                gap: 2,
              }}
            >
              {speciesList.map((species, index) => {
                const imagePath = `/assets/images/${species.genus}_${species.species}.svg`;

                return (
                  <Card
                    key={index}
                    component={Link}
                    to={`/Species/${species.genus}_${species.species}`}
                    sx={{
                      minWidth: '30vw',
                      maxWidth: '30vw',
                      height: '70vh',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      scrollSnapAlign: 'center', 
                      '@media (max-width: 600px)': {
                        minWidth: '50vw',
                        height: '40vh',
                      },
                    }}
                  >
                    <CardActionArea>
                      {/* SVG Image */}
                      <CardMedia
                        component="img"
                        src={imagePath}
                        alt={`${species.scientific_name}`}
                        sx={{
                          height: '60%', 
                          objectFit: 'contain',
                        }}
                      />

                      {/* Text Content */}
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '40%',
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {species.scientific_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: 'center' }}
                        >
                          {species.common_name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ListofSpecies;
