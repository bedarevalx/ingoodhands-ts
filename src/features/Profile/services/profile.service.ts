import {
  checkConfirmEmailCode,
  fetchAds,
  getUserProfile,
  sendConfirmEmail,
  signIn,
  signUp,
} from '../../../api/in-good-hands.api';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import {
  IAuthService,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../../interfaces/auth.interfaces';
import { ITokenResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { updateEmailConfirm } from '../../Auth/slices/auth.slice';
import {
  checkCodeFullfiled,
  checkCodePending,
  checkCodeRejected,
  closeConfirmModal,
  sendEmailFullfilled,
  sendEmailPending,
  sendEmailRejected,
} from '../slices/profile.slice';

export class ProfileService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  sendConfirmEmail =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(sendEmailPending());
        await sendConfirmEmail();
        dispatch(sendEmailFullfilled());
      } catch (error: any) {
        console.error(error);
        dispatch(sendEmailRejected(error.message));
      }
    };

  checkCode =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const { emailCode } = getState().profile;
        dispatch(checkCodePending());
        await checkConfirmEmailCode({ email_code: emailCode });
        dispatch(checkCodeFullfiled());
        dispatch(updateEmailConfirm(true));
        dispatch(closeConfirmModal());
      } catch (error: any) {
        console.error(error);
        dispatch(checkCodeRejected(error.message));
      }
    };
}
