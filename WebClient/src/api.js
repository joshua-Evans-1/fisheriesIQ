import Axios from 'axios';

const server = 'http://localhost:4002';

export const getSpecies = async () => {
  try {
    const response = await Axios.get(`${server}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species data:", error);
    return [];
  }
};

export const getLakes = async (LakeName) => {
  try {
    const response = await Axios.post(`${server}/getLakes`, LakeName);
    return response.data;
  } catch (error) {
    console.error("Error fetching Lake data:", error);
    return [];
  }
};

export const getLakeByID = async (LakeID) => {
  try {
    const response = await Axios.post(`${server}/getLakeByID`, {LakeID});
    return response.data;
  } catch (error) {
    console.error("Error fetching Lake data:", error);
    return [];
  }
};

export const getSpeciesData = async (filters) => {
    try {
      const response = await Axios.post(`${server}/submitSpecies`, filters);
      return response.data;
    } catch (error) {
      console.error("Error fetching species data:", error);
      return [];
    }
};

export const getTaxonomyData = async () => {
  try {
    const response = await Axios.get(`${server}/getTaxonomyData` );
    return response.data;
  } catch (error) {
    console.error("Error fetching Taxonomy data:", error);
    return [];
  }
};

export const getTaxonomyDataUsingGroup = async (taxaName, taxaGroup) => {
  try {
    const response = await Axios.post(`${server}/getTaxonomyDataUsingGroup`, { taxaName, taxaGroup } );
    return response.data;
  } catch (error) {
    console.error("Error fetching Taxonomy data:", error);
    return [];
  }
};


export const fetchSpeciesTaxData = async (speciesName) => {
  try {
      const response = await Axios.post(`${server}/fetchSpeciesTaxData`, speciesName);
      return response.data;
    } catch (error) {
      console.error("Error fetching species taxa data:", error);
      return [];
    }
}

export const fetchSpeciesPopulationData = async (speciesName) => {
  try {
    const response = await Axios.post(`${server}/fetchSpeciesPopulationData`, {speciesName});
    return response.data;
  } catch (error) {
    console.error("Error fetching species population data:", error);
    return [];
  }
};

export const getCounties = async () => {
  try {
    const response = await Axios.get(`${server}/getCounties`);
    return response.data;
  } catch (error) {
    console.error("Error fetching counties data:", error);
    return [];
  }
};

