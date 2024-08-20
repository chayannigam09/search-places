import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'geo/cities/';

export const fetchCities = async (query, limit) => {
  try {
    const response = await axios.get(API_URL, {
      params: { namePrefix: query, limit },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': process.env.REACT_APP_API_HOST
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};