# Server

The FisheriesIQ server is built using **Node.js** and **Express.js**, providing a backend API for querying and managing fisheries-related data. The server interacts with a **MySQL database** to retrieve and store information about species, lakes, taxonomy, and more.

### Key Features
- **Species Data**: Fetch and filter data about various species.
- **Lake Data**: Retrieve details about lakes, including location, size, and survey information.
- **Taxonomy Data**: Access hierarchical taxonomic information for educational and analytical purposes.
- **County Data**: Get a list of counties relevant to Minnesota's aquatic resources.

### Endpoints
- `GET /`: Fetch all species.
- `POST /fetchSpeciesPopulationData`: Retrieve population data for a selected species.
- `GET /getLake`: Get lake data.
- `GET /getTaxonomyData`: Fetch all taxonomy data.
- `POST /getTaxonomyDataUsingGroup`: Fetch taxonomy data filtered by a specific group.
- `GET /getCounties`: Retrieve a list of counties.
- `POST /getLakes`: Get lake details based on name.
- `POST /getLakeByID`: Fetch details about a specific lake by its ID.
- `POST /fetchSpeciesTaxData`: Retrieve taxonomic data for a given species.

### Dependencies
- `Node.js`: Backend framework.
- `Express.js`: Simplified routing and middleware.
- `MySQL2`: Promises-based MySQL database connection.
- `Body-parser`: Parse incoming request bodies.
- `CORS`: Enable cross-origin resource sharing.
- `dotenv`: Load environment variables.
