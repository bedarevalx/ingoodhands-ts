// import { signUp } from '../../../api/in-good-hands.api';
// import { IAuthService, IUserSignUp } from '../../../interfaces/auth.interfaces';
// import { AppDispatch, RootState } from '../../../store';

import { getCategories, getCities } from './api/in-good-hands.api';
import { ICityResponse } from './interfaces/responses.interfaces';
import { AppDispatch, RootState } from './store';
import { setCategories, setCities, setIsLoading } from './store/app.slice';

export class AppService {
  //   signUp = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  //     try {
  //       // dispatch(signUpPending());

  //       const rootState: RootState = getState();
  //       const user: IUserSignUp = {
  //         name: rootState.signUp.name,
  //         email: rootState.signUp.email,
  //         password: rootState.signUp.password,
  //         phone_number: rootState.signUp.phoneNumber,
  //         id_city: rootState.signUp.city,
  //       };
  //       const response = await signUp(user);
  //       console.log(response);
  //       // const userCredentials = await signInWithEmailAndPassword(
  //       //   this.auth,
  //       //   rootState.signUp.email,
  //       //   rootState.signUp.password,
  //       // );
  //       // const profileResponse = await getUserProfile();
  //       // await sendEmailVerification(userCredentials.user);
  //       // localStorage.email = user.email;
  //       // dispatch(signUpSuccess());
  //     } catch (e: any) {
  //       // console.log(e);
  //       // dispatch(
  //       //   signUpError({
  //       //     type: 'signUp',
  //       //     message: e?.response?.data?.toLowerCase() || 'some_error',
  //       //   }),
  //       // );
  //     }
  //   };

  //   getCities =
  //     () => async (dispatch: AppDispatch, getState: () => RootState) => {
  //       try {
  //         const response = await getCities();
  //         console.log(response);
  //       } catch (e: any) {
  //         console.log(e);
  //       }
  //     };

  getCities = async () => {
    const response = await getCities();
    return response?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      sorting: item.sotring,
      isActive: item.is_active,
    }));
  };
  getCategories = async () => {
    const response = await getCategories();
    return response?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      isActive: item.is_active,
      icon: item.icon,
    }));
  };

  getStartData =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        //fetch cities, categories
        const cities = await this.getCities();
        const categories = await this.getCategories();
        dispatch(setCities(cities));
        dispatch(setCategories(categories));
        dispatch(setIsLoading(false));
      } catch (e: any) {
        console.log(e);
      }
    };

  //   auth: Auth = getAuth(firebaseApp);
  //   signIn = async (email: string, password: string): Promise<UserCredential> => {
  //     return signInWithEmailAndPassword(this.auth, email, password);
  //   };
  //   signOut = async (): Promise<void> => signOut(this.auth);
  //   listenAuthStateChange =
  //     (fetchUserProfileCallback: () => Promise<void>) =>
  //     async (dispatch: AppDispatch) => {
  //       dispatch(authenticatePending());
  //       try {
  //         const unsubscribe = onAuthStateChanged(
  //           this.auth,
  //           async (user: User | null) => {
  //             if (user) {
  //               const accessToken = await user.getIdToken();
  //               await localStorage.setItem('accessToken', accessToken);
  //               localStorage.refreshToken = user.refreshToken;
  //               dispatch(setUserUid(user.uid));
  //               await fetchUserProfileCallback();
  //               dispatch(authenticateSuccess(accessToken));
  //             } else {
  //               await localStorage.removeItem('accessToken');
  //               dispatch(authenticateError('User is not exist'));
  //             }
  //           },
  //         );
  //       } catch (e: any) {
  //         await localStorage.removeItem('accessToken');
  //         dispatch(authenticateError(e.message));
  //         console.error(e);
  //       }
  //     };
}
