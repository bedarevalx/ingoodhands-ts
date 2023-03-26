import { AppDispatch } from '../store';
import { IAddressResponse } from './responses.interfaces';
// import { IAuthService } from './auth.interfaces';
// import { UserService } from '../services/user.service';

export interface ISignUpController {
  dispatch: AppDispatch;
  authService: IAuthService;
  //   userService: UserService;
}

export interface ISignInController {
  dispatch: AppDispatch;
  authService: IAuthService;
  //   userService: UserService;
}

export interface IAuthService {
  dispatch: AppDispatch;
}

export interface IUserSignUp {
  email: string;
  password: string;
  phone_number: string;
  id_city: string;
  name: string;
}
export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  name: string;
  isBanned: boolean;
  isEmailVerified: boolean;
  id: string;
  idCity: string;
  isAdmin: boolean;
  phoneNumber: string;
  addresses: IAddressResponse[];
}
