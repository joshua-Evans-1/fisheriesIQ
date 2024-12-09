import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapCenter = ({ selectedLake }) => {
  const map = useMap(); 
  
  useEffect(() => {
    if (selectedLake) {
      map.setView([selectedLake.LAKE_CENTER_LAT_DD5, selectedLake.LAKE_CENTER_LONG_DD5], 14);
    }
  }, [selectedLake, map]); 

  return null;
};

const MapCard = ({ selectedLake }) => {
  return (
    <Card sx={{ mb: 4, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Location Map
        </Typography>
        <Box sx={{ height: 300 }}>
          {selectedLake ? (
            <MapContainer
              center={[selectedLake.LAKE_CENTER_LAT_DD5, selectedLake.LAKE_CENTER_LONG_DD5]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[selectedLake.LAKE_CENTER_LAT_DD5, selectedLake.LAKE_CENTER_LONG_DD5]}
                icon={defaultIcon}
              >
                <Popup>
                  {selectedLake.WATER_BODY_NAME}'s location.
                </Popup>
              </Marker>
              <MapCenter selectedLake={selectedLake} /> 
            </MapContainer>
          ) : (
            <Typography variant="body1">Loading map...</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MapCard;
