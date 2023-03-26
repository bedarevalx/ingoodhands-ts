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
  name: string;
  isActive: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
}

export interface IAppSelectItem<T> {
  id: number | string;
  title: string;
  value: T | string;
}
