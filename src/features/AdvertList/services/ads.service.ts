import {
  fetchAds,
  getUserProfile,
  signIn,
  signUp,
} from '../../../api/in-good-hands.api';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import {
  IAuthService,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../../interfaces/auth.interfaces';
import { ITokenResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchAdsFullfilled,
  fetchAdsPending,
  fetchAdsRejected,
} from '../slices/ads.slice';

export class AdsService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  fetchAds = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchAdsPending());

      const response = await fetchAds();
      console.log(response);

      const ads: IAdPreview[] = response.data.data.map((ad) => ({
        id: ad.id,
        title: ad.title,
        descripton: ad.description,
        imagePath: ad.image_set[0],
        date: ad.date,
        city: ad.city_title,
      }));

      dispatch(fetchAdsFullfilled(ads));
    } catch (e: any) {
      console.error(e);
      dispatch(fetchAdsRejected(e?.response?.data?.message) || 'default_error');
    }
  };
}
