// import { signUp } from '../../../api/in-good-hands.api';
// import { IAuthService, IUserSignUp } from '../../../interfaces/auth.interfaces';
// import { AppDispatch, RootState } from '../../../store';

import { getCategories, getCities } from './api/in-good-hands.api';
import { ICategory, ICity } from './interfaces/general.interfaces';
import { ICityResponse } from './interfaces/responses.interfaces';
import { AppDispatch, RootState } from './store';
import { setCategories, setCities, setIsLoading } from './store/app.slice';

export class AppService {
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
        const resCities = await this.getCities();
        const resCategories = await this.getCategories();
        const categories: ICategory[] = resCategories.map((category) => ({
          title: category.name,
          value: category.id,
          ...category,
        }));
        const cities: ICity[] = resCities.map((city) => ({
          id: city.id,
          isActive: city.isActive,
          title: city.name,
          value: city.id,
        }));
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
