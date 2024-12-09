import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Card, CardContent, Breadcrumbs, Link, } from '@mui/material';
import { getTaxonomyDataUsingGroup } from '../api';

const TaxaProfile = () => {
  const { taxaName, taxaGroup } = useParams();
  const [taxaDetails, setTaxaDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const taxonomyLevels = [
    'kingdom',
    'phylum',
    'class',
    'order',
    'family',
    'genus',
    'species',
  ];

  useEffect(() => {
    document.title = `${taxaName} - FisheriesIQ`;

    const fetchTaxaDetails = async () => {
      try {
        setLoading(true);

        const data = await getTaxonomyDataUsingGroup(taxaName, taxaGroup);
        setTaxaDetails(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching taxonomic data:', err);
        setError('Failed to load taxonomic data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaxaDetails();
  }, [taxaGroup, taxaName]);

  const generateBreadcrumbs = () => {
    if (!taxaDetails.length) return [];
  
    const taxa = taxaDetails[0];
    const currentIndex = taxonomyLevels.indexOf(taxaGroup.toLowerCase());
  
    return taxonomyLevels.slice(0, currentIndex + 1).map((level) => {
      const name = taxa[level];
      const descKey = `${level}_desc`;
      const description = taxa[descKey];
  
      return {
        group: level.charAt(0).toUpperCase() + level.slice(1),
        name,
        description,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  const getChildTaxa = () => {
    if (!taxaDetails.length) return [];

    const currentIndex = taxonomyLevels.indexOf(taxaGroup.toLowerCase());
    if (currentIndex === taxonomyLevels.length - 1) return [];

    const childLevel = taxonomyLevels[currentIndex + 1];
    const childTaxa = taxaDetails
      .filter((taxa) => taxa[taxaGroup.toLowerCase()] === taxaName)
      .map((taxa) => taxa[childLevel]);

    return [...new Set(childTaxa)];
  };

  const childTaxa = getChildTaxa();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {taxaGroup}: {taxaName}
      </Typography>
      {!loading && !error && taxaDetails.length > 0 && (
      <Typography variant="h5" gutterBottom>
        {
          taxaDetails[0][`${taxaGroup.toLowerCase()}_desc`] 
        }
      </Typography>
    )}
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Classification
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((item, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={`/${item.group}/${item.name}`}
                  underline="hover"
                >
                  {item.name}({item.description})
                </Link>
              ))}
            </Breadcrumbs>
          </CardContent>
        </Card>
      )}

      {/* List of Child Taxa */}
      {childTaxa.length > 0 && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Child Taxa of {taxaName}:
            </Typography>
            <ul>
              {childTaxa.map((child, index) => {
                const currentIndex = taxonomyLevels.indexOf(taxaGroup.toLowerCase());
                const childLevel = taxonomyLevels[currentIndex + 1];

                const childTaxonDetails = taxaDetails.find(
                  (taxa) =>
                    taxa[taxaGroup.toLowerCase()] === taxaName &&
                    taxa[childLevel] === child
                );

                const isSpeciesLevel = currentIndex === taxonomyLevels.length - 2;
                const scientificName =
                  isSpeciesLevel && childTaxonDetails
                    ? `${childTaxonDetails.genus}_${childTaxonDetails.species}`
                    : null;

                const commonName = childTaxonDetails?.common_name;

                return (
                  <li key={index} style={{ marginBottom: '1rem' }}>
                    {isSpeciesLevel && scientificName ? (
                      <>
                        <Link
                          component={RouterLink}
                          to={`/Species/${scientificName}`}
                          underline="hover"
                        >
                          {childTaxonDetails.species}
                        </Link>
                        {commonName && (
                          <Typography variant="body2" color="textSecondary">
                            {commonName}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <>
                        <Link
                          component={RouterLink}
                          to={`/${childLevel}/${child}`}
                          underline="hover"
                        >
                          {child}
                        </Link>
                        {childTaxonDetails?.[`${childLevel}_desc`] && (
                          <Typography variant="body2" color="textSecondary">
                            {childTaxonDetails[`${childLevel}_desc`]}
                          </Typography>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}


      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Taxa Details Table */}
      {!loading && !error && taxaDetails.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Taxa Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(taxaDetails[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {taxaDetails.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TaxaProfile;
