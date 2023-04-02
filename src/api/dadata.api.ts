import axios from '../axios/dadata.axios';
import { ICreatePost } from '../interfaces/ads.interfaces';
import { IUserSignIn, IUserSignUp } from '../interfaces/auth.interfaces';
import { IReverseGeocoding } from '../interfaces/geo.interfaces';
import {
  ICategoryResponse,
  ICityResponse,
  IForwardGeocodingResponse,
  IGetAdsResponse,
  IGetProfileResponse,
  ITokenResponse,
} from '../interfaces/responses.interfaces';

export const forwardGeocoding = async (body: { query: string }) => {
  return await axios.post<IForwardGeocodingResponse>('/suggest/address', body);
};

export const reverseGeocoding = async (body: IReverseGeocoding) => {
  return await axios.post<IForwardGeocodingResponse>(
    '/geolocate/address',
    body,
  );
};
