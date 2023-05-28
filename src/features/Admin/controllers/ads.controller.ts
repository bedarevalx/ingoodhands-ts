import { AdsService } from '..';
import { IAdminAdsController } from '../../../interfaces/admin.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { setAds, setPage, setTotalPages } from '../slices/ads.slice';

export class AdsController implements IAdminAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  adsService: AdsService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.adsService = new AdsService();
  }
  getPendingAds = () => {
    this.dispatch(this.adsService.getPendingAds());
  };
  onChangePage = (_: any, page: number) => {
    const state = this.getState().adminAds;
    if (page === state.page) return;
    this.dispatch(setPage(page));
    this.getPendingAds();
  };

  clearState = () => {
    this.dispatch(setPage(1));
    this.dispatch(setTotalPages(0));
    this.dispatch(setAds([]));
  };
}
