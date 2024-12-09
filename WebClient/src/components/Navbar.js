import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Navbar = () => {
  const [speciesMenuAnchor, setSpeciesMenuAnchor] = useState(null);
  const [waterbodiesMenuAnchor, setWaterbodiesMenuAnchor] = useState(null);

  const handleSpeciesMenuOpen = (event) => {
    setSpeciesMenuAnchor(event.currentTarget);
  };

  const handleSpeciesMenuClose = () => {
    setSpeciesMenuAnchor(null);
  };

  const handleWaterbodiesMenuOpen = (event) => {
    setWaterbodiesMenuAnchor(event.currentTarget);
  };

  const handleWaterbodiesMenuClose = () => {
    setWaterbodiesMenuAnchor(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }} component={Link} to="/">
            <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="App Logo" style={{ width: '24px', height: '24px' }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FisheriesIQ
          </Typography>

          {/* Species Menu */}
          <Button
            color="inherit"
            onClick={handleSpeciesMenuOpen}
          >
            Species
          </Button>
          <Menu
            anchorEl={speciesMenuAnchor}
            open={Boolean(speciesMenuAnchor)}
            onClose={handleSpeciesMenuClose}
          >
            <MenuItem component={Link} to="/SpeciesFinder" onClick={handleSpeciesMenuClose}>
              SpeciesFinder
            </MenuItem>
            <MenuItem component={Link} to="/TaxonomySearch" onClick={handleSpeciesMenuClose}>
              Taxonomy Search
            </MenuItem>
            <MenuItem component={Link} to="/Species/List" onClick={handleSpeciesMenuClose}>
              List of Fish Species
            </MenuItem>
          </Menu>

          {/* Waterbodies Menu */}
          <Button
            color="inherit"
            onClick={handleWaterbodiesMenuOpen}
          >
            Waterbodies
          </Button>
          <Menu
            anchorEl={waterbodiesMenuAnchor}
            open={Boolean(waterbodiesMenuAnchor)}
            onClose={handleWaterbodiesMenuClose}
          >
            <MenuItem component={Link} to="/LakeFinder" onClick={handleWaterbodiesMenuClose}>
              LakeFinder
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
