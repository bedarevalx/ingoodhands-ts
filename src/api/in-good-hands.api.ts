import axios from '../axios/in-good-hands.axios';
import { parseQueryParams } from '../helpers/parseQueryParams';
import { ICreatePost, IFetchAdParams } from '../interfaces/ads.interfaces';
import { IUserSignIn, IUserSignUp } from '../interfaces/auth.interfaces';
import {
  ICheckCodeBody,
  IEditProfileBody,
  IUserAd,
} from '../interfaces/profile.interfaces';
import {
  IAdvertResponse,
  ICategoryResponse,
  ICityResponse,
  IContactResponse,
  IGetAdsResponse,
  IGetAdvertResponse,
  IGetFavoritesResponse,
  IGetProfileResponse,
  IGetUserPostsResponse,
  IReviewResponse,
  ISearchUserResponse,
  ITokenResponse,
  IUserPostResponse,
} from '../interfaces/responses.interfaces';
import { IListResponse } from '../interfaces/general.interfaces';
import {
  IAdsSearchParams,
  ICreateCategoryBody,
  ICreateCityBody,
  IEditCategoryBody,
  IEditCityBody,
  IUserSearchParams,
} from '../interfaces/admin.interfaces';

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

export const getFavoritePostsId = async () => {
  return await axios.get<number[]>('/api/all_favorite_posts_id');
};

export const fetchAds = async (params: IFetchAdParams) => {
  const query = parseQueryParams(params);
  return await axios.get<IListResponse<IUserPostResponse>>(
    `/api/all_posts?${query}`,
  );
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

export const getUserPosts = async (page: number) => {
  const query = parseQueryParams({ page });
  return await axios.get<IGetUserPostsResponse>(`/api/my_posts?${query}`);
};

export const getFavorites = async (page: number) => {
  const query = parseQueryParams({ page });
  return await axios.get<IListResponse<IUserPostResponse>>(
    `/api/all_favorite_posts?${query}`,
  );
};

export const addToFavorite = async (adId: number) => {
  const query = parseQueryParams({ id_post: adId });
  return await axios.post(`/api/add_post_to_favorive?${query}`);
};

export const removeFromFavorite = async (adId: number) => {
  const query = parseQueryParams({ id_post: adId });
  return await axios.delete(`/api/delete_post_from_favorite?${query}`);
};

export const createCategory = async (body: ICreateCategoryBody) => {
  return await axios.post('/api/admin/create_category', body);
};
export const createCity = async (body: ICreateCityBody) => {
  return await axios.post('/api/admin/create_city', body);
};

export const editCity = async (body: IEditCityBody) => {
  return await axios.patch('/api/admin/change_city', body);
};

export const editCategory = async (body: IEditCategoryBody) => {
  return await axios.patch('/api/admin/change_category', body);
};

export const deleteCity = async (id: number) => {
  const query = parseQueryParams({ id_city: id });
  return await axios.delete(`/api/admin/delete_city?` + query);
};

export const deleteCategory = async (id: number) => {
  const query = parseQueryParams({ id_category: id });
  return await axios.delete(`/api/admin/delete_category?` + query);
};

export const getAllCities = async () => {
  return await axios.get<ICityResponse[]>('/api/admin/all_cities');
};

export const getAllCategories = async () => {
  return await axios.get<ICategoryResponse[]>('/api/admin/all_categories');
};

export const getPost = async (id: string) => {
  const query = parseQueryParams({ id_post: id });
  return await axios.get<IGetAdvertResponse>(`/api/get_post?${query}`);
};

export const searchAds = async (params: IAdsSearchParams) => {
  const query = parseQueryParams(params);
  return await axios.get<IListResponse<IAdvertResponse>>(
    `/api/admin/get_all_posts?${query}`,
  );
};

export const searchUsers = async (params: IUserSearchParams) => {
  const query = parseQueryParams(params);
  return await axios.get<IListResponse<ISearchUserResponse>>(
    `/api/admin/get_all_users?${query}`,
  );
};

export const getContacts = async (id: number) => {
  const query = parseQueryParams({ id_post: id });
  return await axios.get<IContactResponse>(`/api/get_contact?${query}`);
};

export const getSimilarPosts = async (id: number) => {
  const query = parseQueryParams({ id_post: id });
  return await axios.get<IUserPostResponse[]>(`/api/similar_posts?${query}`);
};

export const getFavoritesId = async () => {
  return await axios.get<number[]>(`/api/all_favorite_posts_id`);
};

export const getReviews = async (id: number) => {
  const query = parseQueryParams({ id_user_owner: id });
  return await axios.get<IReviewResponse[]>(`/api/get_user_reviews?${query}`);
};
