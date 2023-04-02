import { AppDispatch } from '../store';
import { IAuthService } from './auth.interfaces';
import { IAddress } from './general.interfaces';

export interface IAdsController {
  dispatch: AppDispatch;
  //   userService: UserService;
}

export interface IAdPreview {
  id: string;
  title: string;
  city: string;
  imagePath: string;
  descripton: string;
  date: string;
}

export interface ICreatePost {
  title: string;
  id_category: string;
  image_set: string[];
  address: IAddress;
  id_city: string;
  description?: string;
}
