import { AppDispatch } from '../store';
import { AdsStatusTypes } from '../types/general.types';
import { ICategory } from './general.interfaces';

export interface IProfileController {
  dispatch: AppDispatch;
}

export interface IMyAdsController {
  dispatch: AppDispatch;
}

export interface IFavoritesController {
  dispatch: AppDispatch;
}

export interface ICheckCodeBody {
  email_code: string;
}

export interface IEditProfileBody {
  name: string;
  email: string;
  phone_number: string;
  id_city: string;
}

export interface IUserAd {
  title: string;
  address?: string;
  category: ICategory;
  city: string;
  date: string;
  imagePath: string;
  status?: AdsStatusTypes;
  viewCount?: number;
  likeCount?: number;
  description: string;
  id: number;
  isFavorited: boolean;
}
