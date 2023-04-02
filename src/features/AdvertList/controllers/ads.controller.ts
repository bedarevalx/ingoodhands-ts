import {
  IAuthService,
  ISignInController,
} from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {} from '../slices/ads.slice';
import { SelectChangeEvent } from '@mui/material';
import { APP_CONSTANTS } from '../../../constants/app';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { AdsService } from '../services/ads.service';

export class AdsController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  navigate: NavigateFunction;
  adsService: AdsService;

  constructor(dispatch: AppDispatch, navigate: NavigateFunction) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.navigate = navigate;
    this.adsService = new AdsService(dispatch);
  }
  fetchAds = () => {
    this.dispatch(this.adsService.fetchAds());
  };
}
