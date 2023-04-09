import {
  IAuthService,
  ISignInController,
} from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setLoading } from '../slices/ads.slice';
import { SelectChangeEvent } from '@mui/material';
import { APP_CONSTANTS } from '../../../constants/app';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { AdsService } from '../services/ads.service';

export class AdsController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  adsService: AdsService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.adsService = new AdsService(dispatch);
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
}
