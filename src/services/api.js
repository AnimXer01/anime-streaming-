import axios from 'axios';

// For Developement Purposes
const BASE_URL = `${import.meta.env.VITE_BACKEND_DEP}api/v1`;

export const fetchData = async (path) => {
  try {
    const url = BASE_URL + path;

    const response = await axios.get(url, {
      headers: {
        origin: `${import.meta.env.VITE_BACKEND_DEP}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Error occurred in api.js::fetchData() :: ${error}`);
  }
};
