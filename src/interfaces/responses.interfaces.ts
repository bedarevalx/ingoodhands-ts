import { AdsStatusTypes } from '../types/general.types';

export interface ICityResponse {
  id: string;
  name: string;
  sotring: number;
  is_active: boolean;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  is_active: boolean;
  icon: string;
}

export interface IGetProfileResponse {
  addresses: IAddressResponse[];
  blocked_admin: boolean;
  created_at: string;
  email: string;
  email_verified_at: string;
  id: string;
  city: IUserCity;
  is_admin: boolean;
  name: string;
  phone_number: string;
}

export interface IGetUserPostsResponse {
  data: IUserPostResponse[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface IUserPostResponse {
  id: number;
  title: string;
  address: IAddressResponse;
  category: ICategoryResponse;
  city: IUserCity;
  date: string;
  description: string;
  image_set: string[];
  status: AdsStatusTypes;
  view_count: number;
  like_count: number;
}

export interface IUserCity {
  id: number;
  name: string;
  is_active: boolean;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IUserCredentialsResponse {
  name: string;
  email: string;
  phone_number: string;
  id_city: string;
  updated_at: string;
  created_at: string;
  id: string;
}

export interface IUserSignUpResponse {
  message: string;
  user: IUserCredentialsResponse;
}

export interface IAddressResponse {
  id?: string;
  id_city?: string;
  id_user?: string;
  latitude: number;
  longitude: number;
  title: string;
}
export interface IGetAdsResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IAdPreviewResponse[];
}

export interface IGetAdsData {}

interface IAdPreviewResponse {
  address: {
    latitude: string;
    longitude: string;
    title: string;
  };
  category_title: string;
  city_title: string;
  date: string;
  description: string;
  id: string;
  image_set: string[];
  status: AdsStatusTypes;
  title: string;
  view_count: number;
}

export interface IForwardGeocodingResponse {
  suggestions: {
    data: {
      geo_lat: number;
      geo_lon: number;
    };
    value: string;
  }[];
}
