import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardActions, Grid, Divider } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  useEffect(() => {
    document.title = "Home - FisheriesIQ";
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {/* Heading Section */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to FisheriesIQ
      </Typography>

      <Typography variant="body1" align="center" sx={{ maxWidth: 700, margin: '0 auto', paddingBottom: 4 }}>
        FisheriesIQ is dedicated to advancing the understanding of fisheries biology and aquatic ecosystems in Minnesota. By delivering accessible tools for data analysis and educational visualization, it bridges the gap between complex scientific data and practical application. Designed to democratize access to critical information, FisheriesIQ empowers informed decision-making and fosters a deeper appreciation of aquatic environments. This platform serves as a comprehensive resource for exploring species, habitats, and behavior, equipping educators, anglers, and enthusiasts with the knowledge needed for meaningful engagement and sustainable practices.
      </Typography>

      {/* Features Section */}
      <Grid container spacing={4}>
        {/* SpeciesFinder */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                SpeciesFinder
              </Typography>
              <Typography variant="body2">
                Leverage survey data recorded by the MN DNR to locate populations of specific species in lakes and rivers.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SearchIcon />}
                component={Link}
                to="/SpeciesFinder"
              >
                Explore SpeciesFinder
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* LakeFinder */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                LakeFinder
              </Typography>
              <Typography variant="body2">
                Explore comprehensive lake data, including characteristics and species distribution, to plan your fishing trips.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ExploreIcon />}
                component={Link}
                to="/LakeFinder"
              >
                Explore LakeFinder
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Taxonomy Search */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Taxonomy Search
              </Typography>
              <Typography variant="body2">
                An interactive tree graph to explore taxonomic relationships between fish species.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SearchIcon />}
                component={Link}
                to="/TaxonomySearch"
              >
                Explore Taxonomy
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Species List */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Species List
              </Typography>
              <Typography variant="body2">
                Browse a comprehensive list of fish species found in Minnesota.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ExploreIcon />}
                component={Link}
                to="/Species/List"
              >
                Explore Species List
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ marginY: 4 }} />
    </Box>
  );
};

export default Home;
