import { DealsSearchParamTypes } from '../types/ads.types';
import { IAdPreview } from './ads.interfaces';
import { ICategory, ICity } from './general.interfaces';
import { IAddressResponse } from './responses.interfaces';

export interface IReservation {
  id: number;
  createdAt: string;
  days: number;
  user: IReservationUser;
  post: IReservationPost;
}

export interface IReservationUser {
  createdAt: string;
  id: number;
  name: string;
  rating: number;
}

export interface IReservationPost {
  category?: ICategory;
  city: string;
  date: string;
  description: string;
  id: number;
  imagePath: string;
  title: string;
  user: IReservationUser;
}

export interface IDeal {
  id: number;
  days: number;
  createdAt: string;
  expiredAt?: string;
  status: DealsSearchParamTypes;
  post: IReservationPost;
  contacts?: {
    phone: string;
    address: { latitude: string; longitude: string; title: string };
  };
  score?: number;
  user: IReservationUser;
}

export interface IPostReservation {
  expiredAt: string;
  id: number;
  status: DealsSearchParamTypes;
  user: IReservationUser;
}
