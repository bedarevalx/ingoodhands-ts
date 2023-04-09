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
import { SortByTypes, SortTypeTypes } from '../../../types/ads.types';
import {
  fetchAdsFullfilled,
  fetchAdsPending,
  fetchAdsRejected,
  setIsLastPage,
  setPage,
} from '../slices/ads.slice';

export class AdsService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  fetchAds =
    (
      page: number,
      title: string,
      sortBy: SortByTypes,
      sortType: SortTypeTypes,
      idCity: string,
      idCategory: string,
    ) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const adsState = getState().ads;
        dispatch(fetchAdsPending());

        const response = await fetchAds({
          page,
          title,
          sortBy,
          sortType,
          id_category: idCategory,
          id_city: idCity,
        });
        if (response.data.page === response.data.total_pages) {
          dispatch(setIsLastPage(true));
        } else {
          dispatch(setIsLastPage(false));
          dispatch(setPage(adsState.page + 1));
        }
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
        dispatch(
          fetchAdsRejected(e?.response?.data?.message) || 'default_error',
        );
      }
    };
}
