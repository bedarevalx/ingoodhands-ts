import { AppDispatch } from '../store';

export interface IDictionariesController {
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
