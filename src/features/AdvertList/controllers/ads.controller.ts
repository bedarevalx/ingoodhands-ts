import { AppDispatch, RootState, store } from '../../../store';
import {
  removeFavoriteById,
  setError,
  setFavoriteById,
  setLoading,
} from '../slices/ads.slice';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { AdsService } from '../services/ads.service';
import { FavoritesService } from '../../Profile';

export class AdsController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  adsService: AdsService;
  favoritesService: FavoritesService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.adsService = new AdsService(dispatch);
    this.favoritesService = new FavoritesService(dispatch);
  }
  fetchAds = () => {
    const ads = this.getState().ads;
    this.dispatch(
      this.adsService.fetchAds(
        ads.page,
        ads.title,
        ads.sortBy,
        ads.sortType,
        ads.idCity,
        ads.idCategory,
      ),
    );
  };

  setIsLoading = (isLoading: boolean) => {
    this.dispatch(setLoading(isLoading));
  };

  addToFavorites = (id: number) => {
    try {
      this.dispatch(setFavoriteById(id));
      this.dispatch(this.favoritesService.addToFavorites(id));
    } catch (error: any) {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(setError(error.message));
    }
  };

  removeFromFavorites = (id: number) => {
    try {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(this.favoritesService.removeFromFavorites(id));
    } catch (error: any) {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(setError(error.message));
    }
  };
}
