import { AppDispatch } from '../store';
import { SortByTypes, SortTypeTypes } from '../types/ads.types';
import { AdsStatusTypes } from '../types/general.types';
import { IAuthService } from './auth.interfaces';
import { IAddress, ICategory, ICity } from './general.interfaces';

export interface IAdsController {
  dispatch: AppDispatch;
}

export interface IAdvertController {
  dispatch: AppDispatch;
}

export interface IAdPreview {
  id: number;
  title: string;
  city: string;
  imagePath: string;
  descripton: string;
  date: string;
  isFavorite: boolean;
}

export interface ICreatePost {
  title: string;
  id_category: string;
  image_set: string[];
  address: IAddress;
  id_city: string;
  description?: string;
  show_email: boolean;
}

export interface IFetchAdParams {
  title: string;
  id_category: string;
  id_city: string;
  sort_by: SortByTypes;
  sort_type: SortTypeTypes;
  page: number;
}

export interface IAdvert {
  category: ICategory;
  city: ICity;
  createdAt: string;
  description: string;
  id: number;
  imageSet: string[];
  status: AdsStatusTypes;
  title: string;
  updatedAt: string;
  viewCount: number;
  user: IAdvertOnwer;
  address?: IAddress;
  phoneNumber?: string;
}

export interface IAdvertOnwer {
  name: string;
  id: number;
  rating: number;
  createdAt: string;
}

export interface IReview {
  id: number;
  text: string;
  score: number;
  createdAt: string;
  idReservation: number;
  writenBy: string;
}
