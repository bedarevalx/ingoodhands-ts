import { AlertTypes, InputTypes } from '../types/general.types';

export interface IErrorUI {
  message: string;
  type: InputTypes | string | never;
}

export interface IAlertUI {
  message: string;
  type: AlertTypes | string;
}
