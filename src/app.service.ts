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
          value: String(category.id),
          ...category,
        }));
        const cities: ICity[] = resCities.map((city) => ({
          id: city.id,
          isActive: city.isActive,
          title: city.name,
          value: String(city.id),
        }));
        dispatch(setCities(cities));
        dispatch(setCategories(categories));
        dispatch(setIsLoading(false));
      } catch (e: any) {
        console.log(e);
      }
    };
}
