import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = async (mediaType = 'all', timeWindow = 'week') => {
  const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', { params: { page } });
  return response.data;
};

export const getPopularTVShows = async (page = 1) => {
  const response = await tmdbApi.get('/tv/popular', { params: { page } });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getTVShowDetails = async (tvId) => {
  const response = await tmdbApi.get(`/tv/${tvId}`);
  return response.data;
};

export const searchMulti = async (query, page = 1) => {
  const response = await tmdbApi.get('/search/multi', {
    params: { query, page },
  });
  return response.data;
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default tmdbApi;
