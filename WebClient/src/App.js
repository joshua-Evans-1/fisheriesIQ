import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TaxonomyTree from './components/taxTree';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SpeciesFinder from './pages/SpeciesFinder';
import LakeFinder from './pages/LakeFinder';
import SpeciesProfile from './pages/SpeciesProfile'; 
import TaxaProfile from './pages/TaxaProfile'; 
import ListofSpecies from './pages/ListofSpecies';
import WaterbodyProfile from './pages/WaterbodyProfile';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{ color: 'text.secondary' }}
    >
      {' '}
      <Link color="inherit" href="">
        Joshua Evans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden', // Prevent outer scrolling
      }}
    >
      <Router>
        <Navbar
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1200, // Ensures it stays above content
          }}
        />

        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            paddingTop: '64px',
            overflowY: 'auto',
            padding: 2,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SpeciesFinder" element={<SpeciesFinder />} />
            <Route path="/LakeFinder" element={<LakeFinder />} />
            <Route path="/TaxonomySearch" element={<TaxonomyTree />} />
            <Route path="/Species/List" element={<ListofSpecies />} />
            <Route path="/Species/:speciesName" element={<SpeciesProfile />} />
            <Route path="/:taxaGroup/:taxaName" element={<TaxaProfile />} />
            <Route path="/Waterbody/:waterBodyId" element={<WaterbodyProfile />} />

          </Routes>

          <Box sx={{ mt: 4 }}>
            <Copyright />
          </Box>
        </Box>
      </Router>
    </Box>
  );
}
