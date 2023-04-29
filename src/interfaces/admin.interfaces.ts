import { AppDispatch } from '../store';

export interface IDictionariesController {
  dispatch: AppDispatch;
}

export interface ISearchController {
  dispatch: AppDispatch;
}

export interface ICreateCategoryBody {
  name: string;
  icon: string;
  is_active: boolean;
}

export interface IEditCategoryBody {
  id_category: number;
  name?: string;
  icon?: string;
  is_active?: boolean;
}

export interface ICreateCityBody {
  name: string;
  is_active: boolean;
}

export interface IEditCityBody {
  id_city: number;
  name?: string;
  is_active?: boolean;
}

export interface IAdsSearchParams {
  title?: string;
  id_user?: string;
  id_ad?: string;
  offset: number;
  limit: number;
  page: number;
}

export interface IUserSearchParams {
  email?: string;
  id_user?: string;
  limit: number;
  page: number;
}

export interface ISearchedUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  rating: number;
  createdAt: string;
  isBanned: boolean;
}
