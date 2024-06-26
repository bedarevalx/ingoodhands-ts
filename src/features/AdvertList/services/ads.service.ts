import { fetchAds } from '../../../api/in-good-hands.api';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { SortByTypes, SortTypeTypes } from '../../../types/ads.types';
import {
  fetchAdsFullfilled,
  fetchAdsPending,
  fetchAdsRejected,
  setIsLastPage,
  setPage,
} from '../slices/ads.slice';
import { parseDate } from '../../../helpers/parseDate';

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
        const favoritesState = getState().favorites;
        const adsState = getState().ads;
        dispatch(fetchAdsPending());

        const response = await fetchAds({
          page,
          title,
          sort_by: sortBy,
          sort_type: sortType,
          id_category: idCategory,
          id_city: idCity,
        });
        if (response.data.page === response.data.total_pages) {
          dispatch(setIsLastPage(true));
        } else {
          dispatch(setIsLastPage(false));
          dispatch(setPage(adsState.page + 1));
        }

        const ads: IAdPreview[] = response.data.data.map((ad) => {
          return {
            id: ad.id,
            title: ad.title,
            descripton: ad.description,
            imagePath: ad.image_set[0],
            date: parseDate(ad.created_at),
            city: ad.city.name,
            isFavorite: favoritesState.favoritesId.includes(ad.id),
          };
        });

        dispatch(fetchAdsFullfilled(ads));
      } catch (e: any) {
        console.error(e);
        dispatch(
          fetchAdsRejected(e?.response?.data?.message) || 'default_error',
        );
      }
    };
}
