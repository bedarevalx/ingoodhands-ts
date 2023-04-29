import { IAdvertController } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { AdvertService } from '../services/advert.service';
import {
  clearState,
  fetchPostFulfilled,
  fetchPostPending,
  fetchPostRejected,
} from '../slices/advert.slice';

export class AdvertController implements IAdvertController {
  dispatch: AppDispatch;
  getState: () => RootState;
  advertService: AdvertService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.advertService = new AdvertService();
  }

  getAdvertById = async (id: string) => {
    try {
      this.dispatch(fetchPostPending());
      const post = await this.dispatch(this.advertService.getAdvertById(id));
      this.dispatch(fetchPostFulfilled(post));
    } catch (e: any) {
      fetchPostRejected(e.message);
    }
  };

  clearState = () => {
    try {
      this.dispatch(clearState());
    } catch (error) {
      console.log(error);
    }
  };
}
