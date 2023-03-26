import axios from 'axios';
import { refreshToken } from '../api/in-good-hands.api';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_ADDRESS,
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
      const { accessToken: access, refreshToken: refresh } =
        await refreshToken();
      localStorage.token = access;
      localStorage.refresh = refresh;
      originalRequest.headers.Authorization = 'Bearer ' + access;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
