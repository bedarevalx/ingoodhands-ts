import axios from 'axios';
import { refreshToken } from '../api/in-good-hands.api';
import { dadataAccessToken } from '../configs/app.config';

const axiosInstance = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if ('Authorization' in config.headers || !dadataAccessToken) return config;
  config.headers.Authorization = `${dadataAccessToken}`;
  return config;
});

export default axiosInstance;
