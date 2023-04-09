import {
  IAuthService,
  ISignInController,
} from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { APP_CONSTANTS } from '../../../constants/app';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import {
  IMyAdsController,
  IProfileController,
} from '../../../interfaces/profile.interfaces';
import { ProfileService } from '../services/profile.service';
import {
  closeConfirmModal,
  openConfirmModal,
  setCitySelect,
  setEmailCode,
  setEmailInput,
  setIsEditing,
  setNameInput,
  setPhoneInput,
  startEditing,
} from '../slices/profile.slice';
import { MyAdsService } from '../services/my-ads.service';

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
}
