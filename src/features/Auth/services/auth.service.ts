import { getUserProfile, signIn, signUp } from '../../../api/in-good-hands.api';
import {
  IAuthService,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../../interfaces/auth.interfaces';
import { ITokenResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
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
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
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

  fetchUserProfile = async () => {
    try {
      this.dispatch(authenticatePending());
      const response = await getUserProfile();
      const user = {
        isBanned: response.data.blocked_admin,
        isEmailVerified: !!response.data.email_verified_at,
        idCity: response.data.id_city,
        isAdmin: response.data.is_admin,
        phoneNumber: response.data.phone_number,
        email: response.data.email,
        name: response.data.name,
        id: response.data.id,
        addresses: response.data.addresses,
      } as IUser;
      this.dispatch(setUser(user));
      this.dispatch(authenticateFullfilled());
    } catch (e: any) {
      console.log(e);
      this.dispatch(
        authenticateRejected(e?.response?.data?.message) || 'default_error',
      );
    }
  };
}
