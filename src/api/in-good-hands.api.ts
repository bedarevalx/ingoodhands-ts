import axios from 'axios';

export const refreshToken = async () => {
  const refreshToken = localStorage['refresh_token'];
  const accessToken = '123';
  return { accessToken, refreshToken };
};

export const fetchUser = async () => {
  return await axios.post('/api/');
};
