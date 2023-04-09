import { AppDispatch } from '../store';

export interface IProfileController {
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
