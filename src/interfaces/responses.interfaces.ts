export interface ICityResponse {
  id: string;
  name: string;
  sotring: number;
  is_active: boolean;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  is_active: boolean;
  icon: string;
}

export interface IGetProfileResponse {
  addresses: IAddressResponse[];
  blocked_admin: boolean;
  created_at: string;
  email: string;
  email_verified_at: string;
  id: string;
  id_city: string;
  is_admin: boolean;
  name: string;
  phone_number: string;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IUserCredentialsResponse {
  name: string;
  email: string;
  phone_number: string;
  id_city: string;
  updated_at: string;
  created_at: string;
  id: string;
}

export interface IUserSignUpResponse {
  message: string;
  user: IUserCredentialsResponse;
}

export interface IAddressResponse {
  id: string;
  id_city: string;
  id_user: string;
  latitude: string;
  longitude: string;
  title: string;
}
