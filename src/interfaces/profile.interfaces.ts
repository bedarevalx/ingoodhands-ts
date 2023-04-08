import { AppDispatch } from '../store';

export interface IProfileController {
  dispatch: AppDispatch;
}

export interface ICheckCodeBody {
  email_code: string;
}
