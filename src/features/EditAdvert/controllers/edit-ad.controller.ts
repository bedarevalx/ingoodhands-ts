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
  clearState,
  deletePhoto,
  setCategory,
  setDescription,
  setFetchingPost,
  setIsAddressSearchOpen,
  setNewAddress,
  setPickedAddress,
  setTitle,
} from '../slices/edit-ad.slice';
import { IPickedAddress } from '../../../interfaces/geo.interfaces';
import { urlsToBase64 } from '../../../helpers/urlsToBase64';

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

  getPost = async (id: string) => {
    const user = this.getState().auth.user;
    this.dispatch(setFetchingPost(true));
    const post = await this.dispatch(this.editAdService.getPost(id, user.id));
    if (!post) {
      this.navigate('/404');
      return;
    }
    const images = post.imageSet.map((image) => {
      console.log(image);
    });
    await urlsToBase64(post.imageSet);
    this.dispatch(setTitle(post.title));
    this.dispatch(setDescription(post.description));
    this.dispatch(setCategory(String(post.category.id)));
    this.dispatch(addImages(post.imageSet));
    const userAddress = user.addresses.filter(
      (address) => address.title === post.address?.title,
    );
    if (userAddress[0]) {
      this.dispatch(setPickedAddress(userAddress[0].id));
    } else {
      if (post.address) {
        this.dispatch(
          setNewAddress({
            title: post.address?.title,
            value: post.address.title,
            id: post.address.title,
            latitude: post.address.latitude,
            longitude: post.address.longitude,
          }),
        );
        this.dispatch(setPickedAddress(post.address.title));
      }
    }
    this.dispatch(setFetchingPost(false));
  };

  onCreateAd = async () => {
    this.dispatch(
      this.editAdService.onCreateAd(() => this.navigate('/profile/my-ads')),
    );
  };

  onEditAd = (id: string) => {
    this.dispatch(
      this.editAdService.onEditAd(id, () => this.navigate('/profile/my-ads')),
    );
  };

  onPhotoDelete = (id: number) => {
    this.dispatch(deletePhoto(id));
  };

  clearState = () => {
    this.dispatch(clearState());
  };
}
