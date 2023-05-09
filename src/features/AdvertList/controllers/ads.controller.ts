import { AppDispatch, RootState, store } from '../../../store';
import {
  removeFavoriteById,
  setAds,
  setCategory,
  setCity,
  setError,
  setFavoriteById,
  setIsLastPage,
  setLoading,
  setPage,
  setTitle,
} from '../slices/ads.slice';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { AdsService } from '../services/ads.service';
import { FavoritesService } from '../../Profile';
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

export class AdsController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  adsService: AdsService;
  favoritesService: FavoritesService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.adsService = new AdsService(dispatch);
    this.favoritesService = new FavoritesService();
  }
  fetchAds = () => {
    const ads = this.getState().ads;
    const params = this.dispatch(
      this.adsService.fetchAds(
        ads.page,
        ads.title,
        ads.sortBy,
        ads.sortType,
        ads.idCity !== '-1' ? ads.idCity : '',
        ads.idCategory,
      ),
    );
  };

  handleSearch = () => {
    this.dispatch(setPage(1));
    this.dispatch(setIsLastPage(false));
    this.dispatch(setAds([]));
    window.scrollTo(0, 0);
    this.fetchAds();
  };

  setIsLoading = (isLoading: boolean) => {
    this.dispatch(setLoading(isLoading));
  };

  addToFavorites = (id: number) => {
    try {
      this.dispatch(this.favoritesService.addToFavorites(id));
    } catch (error: any) {
      this.dispatch(setError(error.message));
    }
  };

  removeFromFavorites = (id: number) => {
    try {
      this.dispatch(this.favoritesService.removeFromFavorites(id));
    } catch (error: any) {
      this.dispatch(setError(error.message));
    }
  };

  handleChangeCity = (e: SelectChangeEvent) => {
    this.dispatch(setCity(e.target.value));
  };

  handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setTitle(e.target.value));
  };

  handleChangeCategory = (_: any, id: number) => {
    const ads = this.getState().ads;
    if (String(id) === ads.idCategory) {
      this.dispatch(setCategory(''));
    } else {
      this.dispatch(setCategory(String(id)));
    }

    this.handleSearch();
  };
}
