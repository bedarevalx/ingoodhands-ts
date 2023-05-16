import { IAdvertController } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { AdvertService } from '../services/advert.service';
import {
  clearState,
  fetchPostFulfilled,
  fetchPostPending,
  fetchPostRejected,
  setIsReservationModalOpen,
  setReviewsLoading,
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

  getContacts = async () => {
    this.dispatch(this.advertService.getContacts());
  };

  getSimilarPosts = async () => {
    this.dispatch(this.advertService.getSimilarPosts());
  };

  getReviews = async () => {
    this.dispatch(this.advertService.getReviews());
  };

  setReviewsLoading = async (isLoading: boolean) => {
    this.dispatch(setReviewsLoading(isLoading));
  };

  reserveAdvert = async (days: number) => {
    await this.dispatch(this.advertService.reserveAdvert(days));
    this.setIsReservationModalOpen(false);
  };

  setIsReservationModalOpen = (open: boolean) => {
    this.dispatch(setIsReservationModalOpen(open));
  };

  clearState = () => {
    try {
      this.dispatch(clearState());
    } catch (error) {
      console.log(error);
    }
  };
}
