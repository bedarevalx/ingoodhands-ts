import { AppDispatch, RootState, store } from '../../../store';
import { IMyAdsController } from '../../../interfaces/profile.interfaces';
import { MyAdsService } from '../services/my-ads.service';
import { clearState, setPage, setParam } from '../slices/my-ads.slice';
import { AdsStatusTypes } from '../../../types/general.types';

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
    const state = this.getState().myAds;
    if (state.page === page) {
      return;
    }
    this.dispatch(setPage(page));
    this.getMyAds();
  };

  handleDeletePost = (id: number) => {
    this.dispatch(this.myAdsService.deletePost(id));
    this.getMyAds();
  };

  handleParamChange = (_: any, param: AdsStatusTypes | '') => {
    if (param === null) {
      return;
    }
    this.dispatch(setParam(param));
    this.dispatch(setPage(1));
    this.getMyAds();
  };

  handleConfirmDeal = async (id: number) => {
    console.log(id);

    const response = await this.dispatch(this.myAdsService.confirmDeal(id));

    if (!!response) {
      this.getMyAds();
    }
  };

  clearValues = () => {
    this.dispatch(clearState());
  };
}
