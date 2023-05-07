import {
  getFavoritePostsId,
  getUserProfile,
  signIn,
  signUp,
} from '../../../api/in-good-hands.api';
import {
  IAuthService,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../../interfaces/auth.interfaces';
import {
  IGetProfileResponse,
  ITokenResponse,
} from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { FavoritesService } from '../../Profile';
import {
  authenticatePending,
  authenticateFullfilled,
  authenticateRejected,
  setUser,
  signOut,
} from '../slices/auth.slice';
import {
  signInFullfilled,
  signInPending,
  signInRejected,
} from '../slices/signin.slice';
import {
  signUpFullfilled,
  signUpPending,
  signUpRejected,
} from '../slices/signup.slice';

export class AuthService {
  dispatch: AppDispatch;
  favoritesService: FavoritesService;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.favoritesService = new FavoritesService();
  }

  signUp = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(signUpPending());

      const rootState: RootState = getState();
      const user: IUserSignUp = {
        name: rootState.signUp.name,
        email: rootState.signUp.email,
        password: rootState.signUp.password,
        phone_number: rootState.signUp.phoneNumber,
        id_city: rootState.signUp.city,
      };
      const signUpResponse = await signUp(user);
      const userCredentials: IUserSignIn = {
        email: rootState.signUp.email,
        password: rootState.signUp.password,
      };
      const signInResponse = await signIn(userCredentials);
      this.setTokens(signInResponse.data);
      localStorage.accessToken = signInResponse.data.access_token;
      localStorage.refreshToken = signInResponse.data.refresh_token;
      this.fetchUserProfile();
      dispatch(signUpFullfilled());
    } catch (e: any) {
      console.error(e);
      dispatch(signUpRejected(e?.response?.data?.message) || 'default_error');
    }
  };

  signIn =
    (callback: () => void) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(signInPending());

        const rootState: RootState = getState();
        const user: IUserSignIn = {
          email: rootState.signIn.email,
          password: rootState.signIn.password,
        };
        const response = await signIn(user);
        this.setTokens(response.data);
        this.fetchUserProfile();
        dispatch(signInFullfilled());
        callback();
      } catch (e: any) {
        console.error(e);
        dispatch(signInRejected(e?.response?.data?.message || 'default_error'));
      }
    };

  setTokens = async (tokens: ITokenResponse) => {
    localStorage.accessToken = tokens.access_token;
    localStorage.refreshToken = tokens.refresh_token;
  };

  signOut = async () => {
    try {
      this.dispatch(signOut());
      localStorage.accessToken = null;
      localStorage.refreshToken = null;
    } catch (e: any) {
      console.log(e);
    }
  };

  setUserProfile = async (
    userInfo: IGetProfileResponse,
    // favoriteIds: number[],
  ) => {
    try {
      const user = {
        isBanned: userInfo.blocked_admin,
        isEmailVerified: !!userInfo.email_verified_at,
        city: {
          id: userInfo.city.id,
          name: userInfo.city.name,
          isActive: userInfo.city.is_active,
        },
        isAdmin: userInfo.is_admin,
        privileges: userInfo.permissions,
        phoneNumber: userInfo.phone_number,
        email: userInfo.email,
        name: userInfo.name,
        id: userInfo.id,
        balance: userInfo.balance,
        // favoriteIds,
        addresses: userInfo.addresses.map((address) => ({
          title: address.title,
          id: address.id,
          value: address.id,
          longitude: address.longitude,
          latitude: address.latitude,
        })),
      } as IUser;
      this.dispatch(setUser(user));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  fetchUserProfile = async () => {
    try {
      this.dispatch(authenticatePending());
      const response = await getUserProfile();
      this.dispatch(this.favoritesService.getFavoritesId());
      this.setUserProfile(
        response.data,
        //  favoriteIdResponse.data
      );
      this.dispatch(authenticateFullfilled());
    } catch (e: any) {
      console.log(e);
      this.dispatch(
        authenticateRejected(e?.response?.data?.message) || 'default_error',
      );
    }
  };
}
