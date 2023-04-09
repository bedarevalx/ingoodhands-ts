import axios from '../axios/in-good-hands.axios';
import { parseQueryParams } from '../helpers/parseQueryParams';
import { ICreatePost, IFetchAdParams } from '../interfaces/ads.interfaces';
import { IUserSignIn, IUserSignUp } from '../interfaces/auth.interfaces';
import {
  ICheckCodeBody,
  IEditProfileBody,
} from '../interfaces/profile.interfaces';
import {
  ICategoryResponse,
  ICityResponse,
  IGetAdsResponse,
  IGetProfileResponse,
  IGetUserPostsResponse,
  ITokenResponse,
} from '../interfaces/responses.interfaces';

export const refreshToken = async () => {
  const refreshToken = localStorage['refreshToken'];
  return await axios.post<ITokenResponse>('/api/auth/refresh', {
    refresh_token: refreshToken,
  });
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

export const fetchAds = async (params: IFetchAdParams) => {
  const query = parseQueryParams(params);
  return await axios.get<IGetAdsResponse>(`/api/all_posts?${query}`);
};

export const createAd = async (body: ICreatePost) => {
  return await axios.post('/api/create_post', body);
};

export const sendConfirmEmail = async () => {
  return await axios.get('/api/sent_code');
};

export const checkConfirmEmailCode = async (body: ICheckCodeBody) => {
  return await axios.post('/api/check_code', body);
};

export const editProfile = async (body: IEditProfileBody) => {
  return await axios.patch<IGetProfileResponse>('/api/change_user_info', body);
};

export const getUserPosts = async () => {
  return await axios.get<IGetUserPostsResponse>('/api/my_posts');
};
