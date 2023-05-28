import { getHistoryAds } from '../../../api/in-good-hands.api';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { AppDispatch, RootState } from '../../../store';

export class HistoryService {
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;

  getHistoryAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().history;
        const response = getHistoryAds(state.limit, state.page);
      } catch (error) {}
    };
}
