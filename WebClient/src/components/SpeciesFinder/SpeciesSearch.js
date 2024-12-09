import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Grid } from '@mui/material';

const SpeciesSearch = ({ taxonomyData, setSelectedFilters }) => {
  const [selectedCommonName, setSelectedCommonName] = useState(null);
  const [selectedScientificName, setSelectedScientificName] = useState(null);
  const [selectedTaxa, setSelectedTaxa] = useState(null);

  const navigate = useNavigate(); // Use React Router for navigation

  const getUniqueValues = (field) => {
    return [...new Set(taxonomyData.map((row) => row[field]))];
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCommonNameChange = (value) => {
    if (value) {
      const correspondingSpecies = taxonomyData.find((species) => species.common_name === value);
      setSelectedCommonName(value);
      setSelectedScientificName(correspondingSpecies?.scientific_name || null);
      handleNavigation(`/Species/${correspondingSpecies?.scientific_name.replace(/ /g, '_')}`);
    }
  };

  const handleScientificNameChange = (value) => {
    if (value) {
      const correspondingSpecies = taxonomyData.find((species) => species.scientific_name === value);
      setSelectedScientificName(value);
      setSelectedCommonName(correspondingSpecies?.common_name || null);
      handleNavigation(`/Species/${value.replace(/ /g, '_')}`);
    }
  };

  const handleTaxaChange = (value) => {
    if (value) {
      setSelectedTaxa(value.label);
      handleNavigation(`/${value.group}/${value.label}`);
    }
  };

  useEffect(() => {
    setSelectedFilters({
      common_name: selectedCommonName,
      scientific_name: selectedScientificName,
      taxa: selectedTaxa,
    });
  }, [selectedCommonName, selectedScientificName, selectedTaxa, setSelectedFilters]);

  const taxonomicOptions = [
    ...getUniqueValues('kingdom').map((name) => ({ label: name, group: 'Kingdom' })),
    ...getUniqueValues('phylum').map((name) => ({ label: name, group: 'Phylum' })),
    ...getUniqueValues('class').map((name) => ({ label: name, group: 'Class' })),
    ...getUniqueValues('order').map((name) => ({ label: name, group: 'Order' })),
    ...getUniqueValues('family').map((name) => ({ label: name, group: 'Family' })),
    ...getUniqueValues('genus').map((name) => ({ label: name, group: 'Genus' })),
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={getUniqueValues('common_name')}
          getOptionLabel={(option) => option}
          value={selectedCommonName}
          renderInput={(params) => (
            <TextField {...params} label="Search by Common Name" variant="outlined" />
          )}
          onChange={(event, value) => handleCommonNameChange(value)}
          sx={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={getUniqueValues('scientific_name')}
          getOptionLabel={(option) => option}
          value={selectedScientificName}
          renderInput={(params) => (
            <TextField {...params} label="Search by Scientific Name" variant="outlined" />
          )}
          onChange={(event, value) => handleScientificNameChange(value)}
          sx={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={taxonomicOptions}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.label}
          value={selectedTaxa}
          renderInput={(params) => (
            <TextField {...params} label="Search by Taxa" variant="outlined" />
          )}
          onChange={(event, value) => handleTaxaChange(value)}
          sx={{ width: '100%' }}
        />
      </Grid>
    </Grid>
  );
};

export default SpeciesSearch;
