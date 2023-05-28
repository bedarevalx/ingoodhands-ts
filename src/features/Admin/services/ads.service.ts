import {
  cancelModeration,
  getPendingAds,
  getReviewingAds,
} from '../../../api/in-good-hands.api';
import { IAdPreview, IPendingAds } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  setAds,
  setIsLoading,
  setPage,
  setTotalPages,
} from '../slices/ads.slice';
import { parseDate } from '../../../helpers/parseDate';
import { useSnackbar } from '../../../hooks/useSnackbar';

export class AdsService {
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;

  getPendingAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().adminAds;
        dispatch(setAds([]));
        dispatch(setIsLoading(true));

        const response = await getPendingAds(state.limit, state.page);

        const ads: IPendingAds[] = response.data.data.map((ad) => {
          return {
            id: ad.id,
            title: ad.title,
            descripton: ad.description,
            imagePath: ad.image_set[0],
            date: parseDate(ad.created_at),
            city: ad.city.name,
          };
        });
        dispatch(setTotalPages(response.data.total_pages));
        dispatch(setAds(ads));
        dispatch(setIsLoading(false));

        if (ads.length === 0 && state.page > 1) {
          dispatch(setPage(state.page - 1));
          dispatch(this.getPendingAds());
        }
      } catch (error) {
        dispatch(setIsLoading(false));

        console.log(error);
      }
    };

  getReviewingAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().adminAds;
        dispatch(setAds([]));
        dispatch(setIsLoading(true));
        const response = await getReviewingAds(state.limit, state.page);
        const ads: IPendingAds[] = response.data.data.map((ad) => {
          return {
            id: ad.id,
            title: ad.title,
            descripton: ad.description,
            imagePath: ad.image_set[0],
            date: parseDate(ad.created_at),
            city: ad.city.name,
            idChecking: ad.id_checking,
            moderatorEmail: ad.moderator_email,
          };
        });
        dispatch(setAds(ads));
        dispatch(setIsLoading(false));
        if (ads.length === 0 && state.page > 1) {
          dispatch(setPage(state.page - 1));
          dispatch(this.getReviewingAds());
        }
      } catch (error) {}
    };

  cancelModeration =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await cancelModeration(id);
        this.showSuccess('Проверка объявления отменена успешно');
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };
}
