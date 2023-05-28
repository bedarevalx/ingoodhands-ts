import { AdsService } from '..';
import { getReviewingAds } from '../../../api/in-good-hands.api';
import { IAdminAdsController } from '../../../interfaces/admin.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { setAds, setPage, setParam, setTotalPages } from '../slices/ads.slice';

export class AdsController implements IAdminAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  adsService: AdsService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.adsService = new AdsService();
  }

  getAds = () => {
    const state = this.getState().adminAds;
    state.param === 'pending' ? this.getPendingAds() : this.getReviewingAds();
  };
  getPendingAds = () => {
    this.dispatch(this.adsService.getPendingAds());
  };

  getReviewingAds = () => {
    this.dispatch(this.adsService.getReviewingAds());
  };
  onChangePage = (_: any, page: number) => {
    const state = this.getState().adminAds;
    if (page === state.page) return;
    this.dispatch(setPage(page));
    this.getPendingAds();
  };

  onParamChange = (_: any, param: 'pending' | 'review') => {
    if (param === null) {
      return;
    }
    this.dispatch(setParam(param));
    this.dispatch(setPage(1));
    param === 'pending' ? this.getPendingAds() : this.getReviewingAds();
  };

  clearState = () => {
    this.dispatch(setPage(1));
    this.dispatch(setTotalPages(0));
    this.dispatch(setAds([]));
  };
}
