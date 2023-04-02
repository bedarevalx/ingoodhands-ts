import {
  createAd,
  fetchAds,
  getUserProfile,
  signIn,
  signUp,
} from '../../../api/in-good-hands.api';
import { IAdPreview, ICreatePost } from '../../../interfaces/ads.interfaces';
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
} from '../slices/edit-ad.slice';

export class EditAdService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  fetchAds = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      //   dispatch(fetchAdsPending());

      const response = await fetchAds();
      console.log(response);

      const ads: IAdPreview[] = response.data.data.map((ad) => ({
        id: ad.id,
        title: ad.title,
        descripton: ad.description,
        imagePath: ad.image_set[0],
        date: ad.date,
        city: ad.city_title,
      }));

      //   dispatch(fetchAdsFullfilled(ads));
    } catch (e: any) {
      console.error(e);
      //   dispatch(fetchAdsRejected(e?.response?.data?.message) || 'default_error');
    }
  };

  onCreateAd =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(createAdPending());
        const editAd = getState().editAd;
        const { user } = getState().auth;
        let address: IAddress | null;

        if (editAd.pickedAddress === editAd.newAddress?.title) {
          address = {
            title: editAd.newAddress.title,
            latitude: editAd.newAddress.latitude,
            longitude: editAd.newAddress.longitude,
          };
        } else {
          const userAddress = user.addresses.find(
            (userAddress) => userAddress.id === editAd.pickedAddress,
          ) as IUserAddress;
          address = {
            title: userAddress.title,
            longitude: userAddress.longitude,
            latitude: userAddress.latitude,
          };
        }
        const body: ICreatePost = {
          title: editAd.title,
          description: editAd.description,
          id_category: editAd.category,
          image_set: editAd.images.map((image) => image.split(',')[1]),
          id_city: '1',
          address: address,
        };
        const response = await createAd(body);
        console.log(response);
        this.dispatch(createAdFulfilled());
      } catch (error: any) {
        console.log(error);
        this.dispatch(createAdRejected(error.message));
      }
    };
}
