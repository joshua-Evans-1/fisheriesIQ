import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to define __dirname in ES module scope
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

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '../../WebClient/.env' });

const app = express();
const HOST = process.env.REACT_APP_DEV_SERVER_ADDRESS;
const PORT = process.env.REACT_APP_STATUS === 'prod'
  ? process.env.REACT_APP_PROD_SERVER_PORT
  : process.env.REACT_APP_DEV_SERVER_PORT;

// Middleware
app.set('view engine', 'ejs');
app.use(cors({origin: '*',methods: ['GET', 'POST', 'PUT', 'DELETE'],}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve React build files
const buildPath = path.resolve(__dirname, '../../WebClient/build');
app.use(express.static(buildPath));

// API routes
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

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
