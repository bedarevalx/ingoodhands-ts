import {
  IAuthService,
  ISignInController,
  IUserAddress,
} from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { APP_CONSTANTS } from '../../../constants/app';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { EditAdService } from '../services/edit-ad.service';
import {
  addImages,
  setCategory,
  setDescription,
  setIsAddressSearchOpen,
  setNewAddress,
  setPickedAddress,
  setTitle,
} from '../slices/edit-ad.slice';
import { IPickedAddress } from '../../../interfaces/geo.interfaces';

export class EditAdController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  navigate: NavigateFunction;
  editAdService: EditAdService;

  constructor(dispatch: AppDispatch, navigate: NavigateFunction) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.navigate = navigate;
    this.editAdService = new EditAdService(dispatch);
  }

  onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setTitle(event.target.value));
  };

  onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.dispatch(setDescription(event.target.value));
  };

  onAddressChange = (event: SelectChangeEvent) => {
    const { user } = this.getState().auth;

    this.dispatch(setPickedAddress(event.target.value));
  };

  onCategoryChange = (event: SelectChangeEvent) => {
    this.dispatch(setCategory(event.target.value));
  };

  openAddressPicker = () => {
    this.dispatch(setIsAddressSearchOpen(true));
  };

  closeAddressPicker = () => {
    this.dispatch(setIsAddressSearchOpen(false));
  };

  onPickNewAddress = (address: IPickedAddress) => {
    const newAddress: IUserAddress = {
      title: address.title,
      value: address.title,
      id: address.title,
      latitude: address.latitude,
      longitude: address.longitude,
    };
    this.dispatch(setNewAddress(newAddress));
    this.dispatch(setPickedAddress(newAddress.title));

    this.closeAddressPicker();
  };

  onFileLoad = (files: string[]) => {
    const editAd = this.getState().editAd;
    this.dispatch(
      addImages(
        files.slice(0, APP_CONSTANTS.MAX_PHOTO_COUNT - editAd.images.length),
      ),
    );
  };

  onCreateAd = () => {
    this.dispatch(this.editAdService.onCreateAd());
  };
}
