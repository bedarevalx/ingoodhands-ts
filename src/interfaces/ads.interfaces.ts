import { AppDispatch } from '../store';
import { SortByTypes, SortTypeTypes } from '../types/ads.types';
import { IAuthService } from './auth.interfaces';
import { IAddress } from './general.interfaces';

export interface IAdsController {
  dispatch: AppDispatch;
  //   userService: UserService;
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
}

export interface IFetchAdParams {
  title: string;
  id_category: string;
  id_city: string;
  sortBy: SortByTypes;
  sortType: SortTypeTypes;
  page: number;
}
