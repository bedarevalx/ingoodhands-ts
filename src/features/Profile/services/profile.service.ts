import {
  checkConfirmEmailCode,
  editProfile,
  getReviews,
  getUserProfile,
  sendConfirmEmail,
} from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import { IReview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';

import { IEditProfileBody } from '../../../interfaces/profile.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { AuthService } from '../../Auth';
import { setUser, updateEmailConfirm } from '../../Auth/slices/auth.slice';
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
import {
  fetchReviewsFulfilled,
  fetchReviewsPending,
  fetchReviewsRejected,
  setTotalPages,
} from '../slices/reviews.slice';

export class ProfileService {
  dispatch: AppDispatch;
  authService: AuthService;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.authService = new AuthService(dispatch);
  }

  updateProfile =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      const response = await getUserProfile();
      const user: IUser = {
        isBanned: response.data.blocked_admin,
        isEmailVerified: !!response.data.email_verified_at,
        city: {
          id: response.data.city.id,
          name: response.data.city.name,
          isActive: response.data.city.is_active,
        },
        isAdmin: response.data.is_admin,
        privileges: response.data.permissions,
        phoneNumber: response.data.phone_number,
        email: response.data.email,
        name: response.data.name,
        id: response.data.id,
        balance: response.data.balance,
        rating: response.data.rating,
        addresses: response.data.addresses.map((address) => ({
          title: address.title,
          id: address.id as string,
          value: address.id as string,
          longitude: address.longitude,
          latitude: address.latitude,
        })),
      };
      dispatch(setUser(user));
    };

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

        this.authService.setUserProfile(response.data);
        dispatch(editFulfilled());
      } catch (error: any) {
        console.error(error);
        dispatch(editRejected(error.message));
      }
    };

  getMyReviews =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchReviewsPending());
        const user = getState().auth.user;
        const reviewsState = getState().reviews;
        const response = await getReviews(
          Number(user.id),
          reviewsState.page,
          reviewsState.limit,
        );
        const reviews: IReview[] = response.data.data.map((review) => ({
          id: review.id,
          text: review.text,
          score: review.score,
          createdAt: parseDate(review.created_at),
          idReservation: review.id_reservation,
          writenBy: review.user_writer.name,
        }));
        dispatch(setTotalPages(response.data.total_pages));
        dispatch(fetchReviewsFulfilled(reviews));
      } catch (error: any) {
        console.log(error);
        dispatch(fetchReviewsRejected(error));
      }
    };
}
