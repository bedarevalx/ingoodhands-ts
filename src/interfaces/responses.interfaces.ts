import { AdsStatusTypes, UserPrivilegeTypes } from '../types/general.types';
import { IAddress } from './general.interfaces';

export interface ICityResponse {
  id: number;
  name: string;
  sotring: number;
  is_active: boolean;
}

export interface ICategoryResponse {
  id: number;
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
  permissions: UserPrivilegeTypes[];
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

export interface IGetFavoritesResponse<T> {}

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
  created_at: string;
  updated_at: string;
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

export interface IGetAdvertResponse {
  address?: IAddress;
  contacts?: {
    address: IAddress;
    email: string;
    phone: string;
  };
  post: IAdvertResponse;
}

export interface IOwnerAdResponse {
  created_at: string;
  id: number;
  rating: number;
  name: string;
}

export interface IAdvertResponse {
  category: ICategoryResponse;
  city: ICityResponse;
  created_at: string;
  description: string;
  id: number;
  image_set: string[];
  status: AdsStatusTypes;
  title: string;
  updated_at: string;
  view_count: number;
  user: IOwnerAdResponse;
}

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
  id: number;
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

export interface ISearchUserResponse {
  addresses: IAddressResponse[];
  balance: number;
  blocked_admin: boolean;
  city: ICityResponse;
  created_at: string;
  email: string;
  email_verified_at: null | string;
  id: number;
  name: string;
  permissions: UserPrivilegeTypes[];
  phone_number: string;
  rating: number;
}

export interface IContactResponse {
  address: IAddress;
  phone: string;
}
