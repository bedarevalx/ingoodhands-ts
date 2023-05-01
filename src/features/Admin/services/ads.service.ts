import moment from 'moment';
import { getPendingAds } from '../../../api/in-good-hands.api';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { setAds, setIsLoading, setTotalPages } from '../slices/ads.slice';

export class AdsService {
  getPendingAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().adminAds;
        dispatch(setIsLoading(true));
        const response = await getPendingAds(state.limit, state.page);

        const ads: IAdPreview[] = response.data.data.map((ad) => {
          return {
            id: ad.id,
            title: ad.title,
            descripton: ad.description,
            imagePath: ad.image_set[0],
            date: moment(ad.created_at).locale('ru').format('DD MMMM YYYY'),
            city: ad.city.name,
            isFavorite: false,
          };
        });

        dispatch(setTotalPages(response.data.total_pages));
        dispatch(setAds(ads));
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));

        console.log(error);
      }
    };
}
