import React from 'react';
import { Card, CardContent, Typography, Divider, Breadcrumbs, Link, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 
const ClassificationCard = ({ loading, speciesTaxData }) => (
  <Card>
    <CardContent>
        <Typography variant="h6">Classification</Typography>
        <Divider />
        {loading ? (
          <>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </>
        ) : (
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to={`/Kingdom/${speciesTaxData?.kingdom}`}>
              {speciesTaxData?.kingdom}
            </Link>
            <Link component={RouterLink} to={`/Phylum/${speciesTaxData?.phylum}`}>
              {speciesTaxData?.phylum}
            </Link>
            <Link component={RouterLink} to={`/Class/${speciesTaxData?.class}`}>
              {speciesTaxData?.class}
            </Link>
            <Link component={RouterLink} to={`/Order/${speciesTaxData?.order}`}>
              {speciesTaxData?.order}
            </Link>
            <Link component={RouterLink} to={`/Family/${speciesTaxData?.family}`}>
              {speciesTaxData?.family}
            </Link>
            <Link component={RouterLink} to={`/Genus/${speciesTaxData?.genus}`}>
              {speciesTaxData?.genus}
            </Link>
            <Typography color="text.primary">{speciesTaxData?.scientific_name}</Typography>
          </Breadcrumbs>
        )}
      </CardContent>
    </Card>
);

export default ClassificationCard;
