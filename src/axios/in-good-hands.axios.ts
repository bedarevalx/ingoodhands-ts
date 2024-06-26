import axios from 'axios';
import { refreshToken } from '../api/in-good-hands.api';
import { apiDomain } from '../configs/app.config';

const axiosInstance = axios.create({
  baseURL: apiDomain,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.accessToken;
  if ('Authorization' in config.headers || !accessToken) return config;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await refreshToken();
      const access = response.data.access_token;
      const refresh = response.data.refresh_token;
      localStorage.accessToken = access;
      localStorage.refreshToken = refresh;
      originalRequest.headers.Authorization = 'Bearer ' + access;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
