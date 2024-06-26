import axios from '../axios/in-good-hands.axios';
import { parseQueryParams } from '../helpers/parseQueryParams';
import { ICreatePost, IFetchAdParams } from '../interfaces/ads.interfaces';
import { IUserSignIn, IUserSignUp } from '../interfaces/auth.interfaces';
import {
  ICheckCodeBody,
  IEditProfileBody,
} from '../interfaces/profile.interfaces';
import {
  IAdvertResponse,
  ICategoryResponse,
  ICityResponse,
  IContactResponse,
  IGetAdvertResponse,
  IGetDealsResponse,
  IGetHistoryModeration,
  IGetProfileResponse,
  IGetReservationResponse,
  IGetReviewingPostResponse,
  IGetUserPostsResponse,
  IReviewResponse,
  ISearchUserResponse,
  IStartModerationResponse,
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
import {
  DealsSearchParamTypes,
  ReservationSearchParamTypes,
} from '../types/ads.types';
import { UserPrivilegeTypes } from '../types/general.types';

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

export const editAd = async (body: ICreatePost, id: string) => {
  return await axios.patch(`/api/change_post`, {
    ...body,
    id_post: id,
  });
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

export const getUserPosts = async (
  page: number,
  limit: number,
  param?: string,
) => {
  return await axios.get<IGetUserPostsResponse>('/api/my_posts', {
    params: {
      page,
      limit,
      statuses: param,
      sort_by: 'date',
      sort_type: 'desc',
    },
  });
};

export const getFavorites = async (page: number, limit: number) => {
  const query = parseQueryParams({ page, limit });
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

export const deletePost = async (adId: number) => {
  const query = parseQueryParams({ id_post: adId });
  return await axios.delete(`/api/delete_post?${query}`);
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

export const getReviews = async (id: number, page: number, limit: number) => {
  const query = parseQueryParams({ id_user_owner: id, page, limit });
  return await axios.get<IListResponse<IReviewResponse>>(
    `/api/get_user_reviews?${query}`,
  );
};

export const getPendingAds = async (limit: number, page: number) => {
  const query = parseQueryParams({ limit, page });
  return await axios.get<IListResponse<IUserPostResponse>>(
    `/api/admin/get_pending_posts?${query}`,
  );
};

export const startModeration = async (id: string) => {
  return await axios.post<IStartModerationResponse>(
    `/api/admin/start_checking`,
    { id_post: id },
  );
};

export const getPostImages = async (id: string) => {
  const query = parseQueryParams({ id_post: id });
  return await axios.get<string[]>(`/api/get_post_photos?${query}`);
};

export const sendReservation = async (id: string, days: number) => {
  return await axios.post(`/api/send_bid`, { id_post: id, days });
};

export const getReservations = async (
  limit: number,
  page: number,
  param: ReservationSearchParamTypes,
) => {
  const query = parseQueryParams({ limit, page, filter: param });
  return await axios.get<IListResponse<IGetReservationResponse>>(
    `/api/get_bids?${query}`,
  );
};

export const confirmReservation = async (id: number) => {
  return await axios.post(`/api/confirm_bid`, { id_bid: id });
};

export const declineReservation = async (id: number) => {
  const query = parseQueryParams({ id_bid: id });
  return await axios.delete(`/api/delete_bid?${query}`);
};

export const getDeals = async (
  limit: number,
  page: number,
  param: DealsSearchParamTypes[],
) => {
  const query = parseQueryParams({ limit, page });
  return await axios.get<IListResponse<IGetDealsResponse>>(
    `/api/get_reservations?${query}`,
    {
      params: {
        statuses: param,
      },
    },
  );
};

export const changeDealStatus = async (
  id: number,
  status: DealsSearchParamTypes,
) => {
  return await axios.patch(`/api/change_reservation_status`, {
    id_reservation: id,
    status,
  });
};

export const createReview = async (id: number, score: number, text: string) => {
  const body = { id_reservation: id, score, text };
  return await axios.post('/api/create_review', body);
};

export const sendResetPasswordEmail = async (email: string) => {
  return await axios.post('api/send_password_reset_token', { email });
};

export const checkResetPasswordCode = async (token: string) => {
  return await axios.post('api/is_valid_token', { token });
};

export const resetPassword = async (password: string, token: string) => {
  return await axios.post('api/password_reset', { password, token });
};

export const cancelModeration = async (moderationId: number) => {
  return await axios.patch('api/admin/cancel_review', {
    id_checking: moderationId,
  });
};

export const rejectAdvert = async (moderationId: number, reason: string) => {
  return await axios.patch('api/admin/end_checking', {
    id_checking: moderationId,
    result: {
      is_public: false,
      text: reason,
    },
  });
};

export const publishAdvert = async (moderationId: number) => {
  return await axios.patch('api/admin/end_checking', {
    id_checking: moderationId,
    result: {
      is_public: true,
    },
  });
};

export const getReviewingAds = async (limit: number, page: number) => {
  const query = parseQueryParams({ limit, page });
  return await axios.get<IListResponse<IGetReviewingPostResponse>>(
    `api/admin/get_review_posts?${query}`,
  );
};

export const sendToModeration = async (id: number) => {
  return await axios.patch('/api/admin/change_post_status', {
    id_post: id,
    status: 'pending',
  });
};

export const banAdvert = async (id: number) => {
  return await axios.patch('/api/admin/change_post_status', {
    id_post: id,
    status: 'banned',
  });
};
//TODO: переделать по дроут
export const getHistoryAds = async (limit: number, page: number) => {
  const query = parseQueryParams({ limit, page });
  return await axios.get<IListResponse<IGetHistoryModeration>>(
    `api/admin/get_checking_history?${query}`,
  );
};

export const banUser = async (id: number) => {
  return await axios.patch('/api/admin/change_user_status', {
    id_user: id,
    status: 'banned',
  });
};
export const unbanUser = async (id: number) => {
  return await axios.patch('/api/admin/change_user_status', {
    id_user: id,
    status: 'active',
  });
};
export const setUserRole = async (id: number, role: UserPrivilegeTypes) => {
  return await axios.patch('/api/admin/change_user_role', {
    id_user: id,
    role,
  });
};

export const deleteAddress = async (id: string) => {
  const query = parseQueryParams({ id_address: id });
  return await axios.delete(`/api/delete_address?${query}`);
};

export const createAddress = async (
  title: string,
  idCity: string,
  latitude: number,
  longitude: number,
) => {
  return await axios.post(`/api/add_new_address`, {
    title,
    id_city: idCity,
    latitude,
    longitude,
  });
};
