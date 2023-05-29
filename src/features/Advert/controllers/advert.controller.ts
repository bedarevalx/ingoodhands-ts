import { IAdvertController } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { FavoritesService } from '../../Profile';
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
  favoritesService: FavoritesService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.advertService = new AdvertService();
    this.favoritesService = new FavoritesService();
  }

  getAdvertById = async (id: string) => {
    try {
      this.dispatch(fetchPostPending());
      const post = await this.dispatch(this.advertService.getAdvertById(id));
      if (post) this.dispatch(fetchPostFulfilled(post));
      console.log(post);
    } catch (e: any) {
      this.dispatch(
        fetchPostRejected('К сожалению объявление уже не доступно'),
      );
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

  onAddFavorite = () => {
    const state = this.getState().advert;
    this.dispatch(this.favoritesService.addToFavorites(state.id as number));
  };

  onRemoveFavorite = () => {
    const state = this.getState().advert;
    this.dispatch(
      this.favoritesService.removeFromFavorites(state.id as number),
    );
  };

  clearState = () => {
    try {
      this.dispatch(clearState());
    } catch (error) {
      console.log(error);
    }
  };
}
