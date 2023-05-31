import { NavigateFunction } from 'react-router-dom';
import {
  createAd,
  editAd,
  fetchAds,
  getPost,
  getUserProfile,
  signIn,
  signUp,
} from '../../../api/in-good-hands.api';
import {
  IAdPreview,
  IAdvert,
  ICreatePost,
} from '../../../interfaces/ads.interfaces';
import {
  IAuthService,
  IUser,
  IUserAddress,
  IUserSignIn,
  IUserSignUp,
} from '../../../interfaces/auth.interfaces';
import { IAddress } from '../../../interfaces/general.interfaces';
import { ITokenResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  createAdFulfilled,
  createAdPending,
  createAdRejected,
  setFetchingPost,
} from '../slices/edit-ad.slice';
import { useSnackbar } from '../../../hooks/useSnackbar';

export class EditAdService {
  dispatch: AppDispatch;
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  onCreateAd =
    (callback: () => void) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(createAdPending());
        const editAd = getState().editAd;
        const { user } = getState().auth;
        let address: IAddress | null;

        if (editAd.pickedAddress === editAd.newAddress?.title) {
          address = {
            title: editAd.newAddress?.title,
            latitude: editAd.newAddress?.latitude,
            longitude: editAd.newAddress?.longitude,
          };
        } else {
          const userAddress = user.addresses.find(
            (userAddress) => userAddress.id === editAd.pickedAddress,
          ) as IUserAddress;
          address = {
            title: userAddress?.title,
            longitude: userAddress?.longitude,
            latitude: userAddress?.latitude,
          };
        }
        const body: ICreatePost = {
          title: editAd.title,
          description: editAd.description,
          id_category: editAd.category,
          image_set: editAd.images.map((image) => image.split(',')[1]),
          id_city: '1',
          address: address,
          show_email: false,
        };
        const response = await createAd(body);
        this.dispatch(createAdFulfilled());
        this.showSuccess('Объявление отправлено на проверку');
        callback();
      } catch (error: any) {
        this.showError(error?.response?.data || '');
        this.dispatch(createAdRejected(error.message));
      }
    };

  getPost =
    (id: string, userId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await getPost(id);
        if (response.data.post.user.id !== Number(userId)) {
          throw new Error('No your ad');
        }
        const advert = {
          title: response.data.post.title,
          address: response.data.address,
          description: response.data.post.description,
          imageSet: response.data.post.image_set,
          category: response.data.post.category,
          id: response.data.post.id,
        };
        return advert;
      } catch (error) {
        console.log(error);
      }
    };

  onEditAd =
    (id: string, callback: () => void) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(createAdPending());
        const editAdState = getState().editAd;
        const { user } = getState().auth;
        let address: IAddress | null;

        if (editAdState.pickedAddress === editAdState.newAddress?.title) {
          address = {
            title: editAdState.newAddress.title,
            latitude: editAdState.newAddress.latitude,
            longitude: editAdState.newAddress.longitude,
          };
        } else {
          const userAddress = user.addresses.find(
            (userAddress) => userAddress.id === editAdState.pickedAddress,
          ) as IUserAddress;
          address = {
            title: userAddress.title,
            longitude: userAddress.longitude,
            latitude: userAddress.latitude,
          };
        }
        const body: ICreatePost = {
          title: editAdState.title,
          description: editAdState.description,
          id_category: editAdState.category,
          image_set: editAdState.images.map((image) => image.split(',')[1]),
          id_city: '1',
          address: address,
          show_email: false,
        };
        const response = await editAd(body, id);
        this.dispatch(createAdFulfilled());
        callback();
      } catch (error: any) {
        console.log(error);
        this.dispatch(createAdRejected(error.message));
      }
    };
}
