import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

const SearchPanel = ({ expanded, setExpanded, lakeName, setLakeName, fetchLakeData }) => {
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLakeNameChange = (e) => {
    const newLakeName = e.target.value;
    setLakeName(newLakeName);
    fetchLakeData(newLakeName);
  };

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Lake Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={lakeName}
            onChange={handleLakeNameChange}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchPanel;
