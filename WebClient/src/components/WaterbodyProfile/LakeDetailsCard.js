import React from 'react';
import { Link, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const LakeDetailsCard = ({ selectedLake }) => {
  return (
    <Card sx={{ mb: 4, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          WaterBody Details
        </Typography>
        
        {selectedLake && (
          <>
            <Link href={`https://www.dnr.state.mn.us/lakefind/lake.html?id=${selectedLake.ID}`} target="_blank" rel="noopener noreferrer" underline="hover">MNDNR Page </Link>
            <br/>
            <Link href={`https://maps.google.com/?q=${selectedLake.LAKE_CENTER_LAT_DD5},${selectedLake.LAKE_CENTER_LONG_DD5}`} target="_blank" rel="noopener noreferrer" underline="hover">Google Maps</Link>
            <Typography variant="subtitle1"><strong>County:</strong> {selectedLake.COUNTY_NAME}</Typography>
            <Typography variant="subtitle1"><strong>Nearest Town:</strong> {selectedLake.NEAREST_TOWN}</Typography>
            <Typography variant="subtitle1"><strong>Directions from {selectedLake.NEAREST_TOWN}:</strong> {selectedLake.DIRECTIONS_FROM_NEAREST_TOWN}</Typography>
            <Typography variant="subtitle1"><strong>Acres:</strong> {selectedLake.LAKE_AREA_GIS_ACRES}</Typography>
            <Typography variant="subtitle1"><strong>Max Depth (ft):</strong> {selectedLake.MAX_DEPTH_FEET}</Typography>
            <Typography variant="subtitle1"><strong>Shoreline Length (miles):</strong> {selectedLake.SHORE_LENGTH_MILES}</Typography>
            <Typography variant="subtitle1"><strong>Center Coordinates:</strong> ({selectedLake.LAKE_CENTER_LAT_DD5}, {selectedLake.LAKE_CENTER_LONG_DD5})</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LakeDetailsCard;
