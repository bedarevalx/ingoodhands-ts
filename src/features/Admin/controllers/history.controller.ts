import { AppDispatch, RootState, store } from '../../../store';
import { HistoryService } from '../services/history.service';
import { setAds, setPage, setTotalPages } from '../slices/history.slice';

export class HistoryController {
  dispatch: AppDispatch;
  getState: () => RootState;
  historyService: HistoryService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.historyService = new HistoryService();
  }
  getHistoryAds = () => {
    this.dispatch(this.historyService.getHistoryAds());
  };
  onChangePage = (_: any, page: number) => {
    const state = this.getState().adminAds;
    if (page === state.page) return;
    this.dispatch(setPage(page));
    this.getHistoryAds();
  };

  clearState = () => {
    this.dispatch(setPage(1));
    this.dispatch(setTotalPages(0));
    this.dispatch(setAds([]));
  };

  onSendToModeration = (id: number) => {};
}
