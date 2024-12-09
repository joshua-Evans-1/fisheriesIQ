import React from 'react';
import { Box, Typography } from '@mui/material';

const HeaderImage = ({ speciesTaxData }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', height: '300px', justifyContent: 'space-between' }}>
    <Box sx={{ textAlign: 'left', paddingLeft: '20px' }}>
      <Typography variant="h4">{speciesTaxData?.scientific_name}</Typography>
      <Typography variant="h5">{speciesTaxData?.common_name}</Typography>
    </Box>
    <Box
      component="img"
      src={`/assets/images/${speciesTaxData?.scientific_name.replace(/\s+/g, '_')}.svg`}
      alt={`${speciesTaxData?.common_name}`}
      sx={{
        objectFit: 'cover',
        objectPosition: 'center',
        height: '100%',
        clipPath: 'inset(20% 0 20% 0)',
        marginRight: '20px',
      }}
    />
  </Box>
);

export default HeaderImage;
