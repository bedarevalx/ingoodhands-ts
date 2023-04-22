import { AlertTypes, InputTypes } from '../types/general.types';

export interface IErrorUI {
  message: string;
  type: InputTypes | string | never;
}

export interface IAlertUI {
  message: string;
  type: AlertTypes | string;
}

export interface ICity {
  id: string;
  value: string;
  title: string;
  isActive: boolean;
}

export interface IAddress {
  title: string;
  latitude: number;
  longitude: number;
}

export interface ICategory {
  id: string;
  value: string;
  title: string;
  icon: string;
  isActive: boolean;
}

export interface IAppSelectItem<T> {
  id: number | string;
  title: string;
  value: T | string;
}

export interface IListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface IMenuItem<T> {
  id: number;
  value: T;
  text: string;
}
