import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SurveyDataCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Survey Data
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default SurveyDataCard;