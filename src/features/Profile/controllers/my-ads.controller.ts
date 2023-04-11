import { AppDispatch, RootState, store } from '../../../store';
import { IMyAdsController } from '../../../interfaces/profile.interfaces';
import { MyAdsService } from '../services/my-ads.service';
import { clearState, setPage } from '../slices/my-ads.slice';

export class MyAdsController implements IMyAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  myAdsService: MyAdsService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.myAdsService = new MyAdsService(dispatch);
  }

  getMyAds = () => {
    this.dispatch(this.myAdsService.getMyAds());
  };

  handlePageChange = (_: any, page: number) => {
    this.dispatch(setPage(page));
    this.getMyAds();
  };

  clearValues = () => {
    this.dispatch(clearState());
  };
}
