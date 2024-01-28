import axios from 'axios';

const apiKey = '500db87b9ea18c4a4b55a2f334969872'; 
const baseURL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

export const getMovies = (endpoint) => {
  console.log("Endpoint: "+endpoint);
  return api.get(`/movie/${endpoint}`);
};

export const getTVShows = (endpoint) => {
  console.log("Endpoint: "+endpoint);
  return api.get(`/tv/${endpoint}`);
};

export const searchMedia = (type,query) => {
  console.log("query: "+query);
  console.log("type: "+type);
  return api.get(`/search/${type}`, { params: { query, type } });
};

export const getMediaDetails = (id, type) => {
  console.log("api fetch id: "+id);
  console.log("api fetch type: "+type);
  return api.get(`/${type}/${id}`);
};
