import axios from '../axios/axios';
import { IUserSignIn, IUserSignUp } from '../interfaces/auth.interfaces';
import {
  ICategoryResponse,
  ICityResponse,
  IGetProfileResponse,
  ITokenResponse,
} from '../interfaces/responses.interfaces';

export const refreshToken = async () => {
  const refreshToken = localStorage['refresh_token'];
  const accessToken = '123';
  return { accessToken, refreshToken };
};

export const fetchUser = async () => {
  return await axios.post('/api/');
};

export const signUp = async (body: IUserSignUp) => {
  return await axios.post('/api/auth/registr', body);
};

export const signIn = async (body: IUserSignIn) => {
  return await axios.post<ITokenResponse>('/api/auth/login', body);
};

export const getCities = async () => {
  return await axios.get<ICityResponse[]>('/api/city/all_cities');
};
export const getCategories = async () => {
  return await axios.get<ICategoryResponse[]>('/api/category/all_categories');
};

export const getUserProfile = async () => {
  return await axios.get<IGetProfileResponse>('/api/auth/user-profile');
};
