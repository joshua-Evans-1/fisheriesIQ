import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getSpecies,
  getLakes,
  getSpeciesData,
  getTaxonomyData,
  getCounties,
  fetchSpeciesTaxData,
  getTaxonomyDataUsingGroup,
  getLakeByID,
} from './db.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.STATUS === 'prod' ? process.env.PROD_PORT : process.env.DEV_PORT;

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send(await getSpecies());
});

app.post('/fetchSpeciesPopulationData', async (req, res) => {
  const selectedSpecies = req.body;
  if (!selectedSpecies) {
    return res.status(400).send('No species selected.');
  }
  res.send(await getSpeciesData(req.body.speciesName));
});

app.get('/getLake', async (req, res) => {
  res.send(await getLakes());
});

app.get('/getTaxonomyData', async (req, res) => {
  res.send(await getTaxonomyData());
});

app.post('/getTaxonomyDataUsingGroup', async (req, res) => {
  res.send(await getTaxonomyDataUsingGroup(req.body.taxaName, req.body.taxaGroup));
});

app.get('/getCounties', async (req, res) => {
  res.send(await getCounties());
});

app.post('/getLakes', async (req, res) => {
  res.send(await getLakes(req.body));
});

app.post('/getLakeByID', async (req, res) => {
  res.send(await getLakeByID(req.body.LakeID));
});

app.post('/fetchSpeciesTaxData', async (req, res) => {
  res.send(await fetchSpeciesTaxData(req.body));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
