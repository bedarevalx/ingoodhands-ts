import {
  checkConfirmEmailCode,
  editProfile,
  sendConfirmEmail,
} from '../../../api/in-good-hands.api';

import { IEditProfileBody } from '../../../interfaces/profile.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { AuthService } from '../../Auth';
import { updateEmailConfirm } from '../../Auth/slices/auth.slice';
import {
  checkCodeFullfiled,
  checkCodePending,
  checkCodeRejected,
  closeConfirmModal,
  editFulfilled,
  editPending,
  editRejected,
  sendEmailFullfilled,
  sendEmailPending,
  sendEmailRejected,
} from '../slices/profile.slice';

export class ProfileService {
  dispatch: AppDispatch;
  authService: AuthService;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.authService = new AuthService(dispatch);
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

  editProfile =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(editPending());
        const profile = getState().profile;
        const newUserInfo: IEditProfileBody = {
          name: profile.nameInput,
          email: profile.emailInput,
          id_city: profile.citySelect,
          phone_number: profile.phoneInput,
        };
        const response = await editProfile(newUserInfo);
        console.log(response);

        this.authService.setUserProfile(response.data);
        dispatch(editFulfilled());
      } catch (error: any) {
        console.error(error);
        dispatch(editRejected(error.message));
      }
    };
}
