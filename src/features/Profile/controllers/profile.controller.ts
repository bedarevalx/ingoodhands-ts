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
import { IProfileController } from '../../../interfaces/profile.interfaces';
import { ProfileService } from '../services/profile.service';
import {
  closeConfirmModal,
  openConfirmModal,
  setEmailCode,
} from '../slices/profile.slice';

export class ProfileController implements IProfileController {
  dispatch: AppDispatch;
  getState: () => RootState;
  navigate: NavigateFunction;
  profileService: ProfileService;

  constructor(dispatch: AppDispatch, navigate: NavigateFunction) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.navigate = navigate;
    this.profileService = new ProfileService(dispatch);
  }

  handleOpenConfirmEmail = () => {
    this.dispatch(openConfirmModal());
  };
  handleCloseConfirmEmail = () => {
    this.dispatch(closeConfirmModal());
  };

  handleSendConfirmEmail = () => {
    this.dispatch(this.profileService.sendConfirmEmail());
  };

  handleCheckCode = () => {
    this.dispatch(this.profileService.checkCode());
  };

  handleCodeChange = (value: string) => {
    this.dispatch(setEmailCode(value));
  };
}
