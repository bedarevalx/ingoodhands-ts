import { AppDispatch, RootState, store } from '../../../store';
import { IFavoritesController } from '../../../interfaces/profile.interfaces';
import { FavoritesService } from '../services/favorites.service';
import {
  removeFavoriteById,
  setError,
  setFavoriteById,
  setPage,
  clearState,
} from '../slices/favorites.slice';

export class FavoritesController implements IFavoritesController {
  dispatch: AppDispatch;
  getState: () => RootState;
  favoritesService: FavoritesService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.favoritesService = new FavoritesService(dispatch);
  }

  getMyAds = () => {
    this.dispatch(this.favoritesService.getFavorites());
  };

  handlePageChange = (_: any, page: number) => {
    this.dispatch(setPage(page));
    this.getMyAds();
  };

  clearValues = () => {
    this.dispatch(clearState());
  };

  setFavorited = (id: number) => {
    try {
      this.dispatch(setFavoriteById(id));
      this.dispatch(this.favoritesService.addToFavorites(id));
    } catch (error: any) {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(setError(error.message));
    }
  };

  setUnFavorited = (id: number) => {
    try {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(this.favoritesService.removeFromFavorites(id));
    } catch (error: any) {
      this.dispatch(removeFavoriteById(id));
      this.dispatch(setError(error.message));
    }
  };

  handleFavoriteClick = (id: number, isFavorited: boolean) => {
    if (isFavorited) {
      this.setUnFavorited(id);
    } else {
      this.setFavorited(id);
    }
  };
}
