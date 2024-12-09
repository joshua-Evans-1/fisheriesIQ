// Import statements
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

// Create database connection pool
const pool = mysql.createPool({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME
}).promise();

// Query function to get distinct species codes
export async function getSpecies() {
	try {
	  const [results] = await pool.query("SELECT common_name FROM taxonomic_data");
	  return results.map(row => row.SPECIES_CODE);
	} catch (error) {
	  console.error("Error fetching species:", error);
	  return [];
	}
  }
  
  // Query function to get species data based on filters
  export async function getSpeciesData(speciesName) {
	try {
	  const [results] = await pool.query(
		"SELECT * FROM survey_combined WHERE SPECIES_CODE IN (?) ORDER BY TOTAL_CATCH DESC LIMIT 2000",
		speciesName
	  );
	  return results;
	} catch (error) {
	  console.error("Error fetching species data:", error);
	  return [];
	}
  }
  
  // Query function to get taxonomy data filtered by origin
  export async function getTaxonomyData() {
	try {
	  const query = "SELECT * FROM taxonomic_view";
	  const [results] = await pool.query(query);
	  return results;
	} catch (error) {
	  console.error("Error fetching taxonomy data:", error);
	  return [];
	}
  }


  export async function getTaxonomyDataUsingGroup(taxaName, taxaGroup) {
	try {
	  const query = `select * from taxonomic_view where \`${taxaGroup}\` = ?`;
	  const [results] = await pool.query(query, taxaName);
	  return results;
	} catch (error) {
	  console.error("Error fetching taxonomy data:", error);
	  return [];
	}
  }
  // Query function to get counties
  export async function getCounties() {
	try {
	  const query = "select distinct COUNTY_NAME from waterbody_data";
	  const [results] = await pool.query(query);
	  return results.map(row => row.COUNTY_NAME);
	} catch (error) {
	  console.error("Error fetching taxonomy data:", error);
	  return [];
	}
  }

  export async function getLakes(lakeName) {
	try {
	  const [results] = await pool.query(
		"SELECT * from waterbody_data where LAKE_NAME LIKE ? LIMIT 50;",
		lakeName.lakeName
	  );
	  return results;
	} catch (error) {
	  console.error("Error fetching lake data:", error);
	  return [];
	}
  }

  export async function getLakeByID(lakeID) {
	try {
	  const [results] = await pool.query(
		"SELECT * FROM survey_combined WHERE ID IN (?) ORDER BY SURVEY_DATE DESC",
		lakeID
	  );
	  return results;
	} catch (error) {
	  console.error("Error fetching lake data:", error);
	  return [];
	}
  }

  export async function fetchSpeciesTaxData(speciesName) {
	try {
	  speciesName = Object.keys(speciesName)[0];
	  const [results] = await pool.query(
		"select * from taxonomic_view where scientific_name = ?;",
		speciesName	
	  );
	  return results;
	} catch (error) {
	  console.error("Error fetching species data:", error);
	  return [];
	}
  }
  