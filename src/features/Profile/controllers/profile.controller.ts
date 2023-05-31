import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

import { IProfileController } from '../../../interfaces/profile.interfaces';
import { ProfileService } from '../services/profile.service';
import {
  closeConfirmModal,
  openConfirmModal,
  setCitySelect,
  setEmailCode,
  setEmailInput,
  setIsAddressesModalOpened,
  setIsEditing,
  setNameInput,
  setPhoneInput,
  startEditing,
} from '../slices/profile.slice';
import { setPage } from '../slices/reviews.slice';

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

  handleEdit = () => {
    const { user } = this.getState().auth;
    const profile = this.getState().profile;
    const isStartEditing = !profile.isEditing;
    isStartEditing && this.dispatch(startEditing(user));
    this.dispatch(setIsEditing(isStartEditing ? true : false));
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setNameInput(e.target.value));
  };
  handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setPhoneInput(e.target.value));
  };
  handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setEmailInput(e.target.value));
  };

  handleCityChange = (e: SelectChangeEvent) => {
    this.dispatch(setCitySelect(e.target.value));
  };

  handleSave = () => {
    this.dispatch(this.profileService.editProfile());
  };

  getMyReviews = () => {
    this.dispatch(this.profileService.getMyReviews());
  };
  handleReviewsPageChange = (_: any, page: number) => {
    const state = this.getState().reviews;
    if (state.page === page) {
      return;
    }
    this.dispatch(setPage(page));
    this.getMyReviews();
  };

  updateProfile = () => {
    this.dispatch(this.profileService.updateProfile());
  };

  openAddressModal = () => {
    this.dispatch(setIsAddressesModalOpened(true));
  };
  closeAddressModal = () => {
    this.dispatch(setIsAddressesModalOpened(false));
  };

  onDeleteAddress = async (id: string) => {
    await this.dispatch(this.profileService.deleteAddress(id));
    this.dispatch(this.profileService.updateProfile());
  };
}
