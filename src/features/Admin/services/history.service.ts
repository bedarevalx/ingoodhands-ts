import {
  getHistoryAds,
  getReviewingAds,
  sendToModeration,
} from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { IHistoryAd } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { setAds, setIsLoading, setTotalPages } from '../slices/history.slice';

export class HistoryService {
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;

  getHistoryAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(setAds([]));
        dispatch(setIsLoading(true));
        const state = getState().history;
        const response = await getHistoryAds(state.limit, state.page);
        const ads: IHistoryAd[] = response.data.data.map((item) => {
          return {
            id: item.post.id,
            title: item.post.title,
            descripton: item.post.description,
            imagePath: item.post.image_set[0],
            date: parseDate(item.created_at),
            city: item.post.city.name,
            moderatorEmail: item.moderator_email,
            isPublished: item.result.is_public,
            moderatedAt: parseDate(item.created_at),
            resultText: item.result.text,
          };
        });
        dispatch(setAds(ads));
        dispatch(setTotalPages(response.data.total_pages));
        dispatch(setIsLoading(false));
      } catch (error) {}
    };

  onSendToModeration =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await sendToModeration(id);
        this.showSuccess('Объявление отправлено на модерацию');
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };
}
