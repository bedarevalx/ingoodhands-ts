import {
  createCategory,
  createCity,
  deleteCategory,
  deleteCity,
  editCategory,
  editCity,
  getAllCategories,
  getAllCities,
} from '../../../api/in-good-hands.api';
import {
  ICreateCategoryBody,
  ICreateCityBody,
  IEditCategoryBody,
  IEditCityBody,
} from '../../../interfaces/admin.interfaces';
import { ICategory, ICity } from '../../../interfaces/general.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchCategoriesFulfilled,
  fetchCategoriesPending,
  fetchCategoriesRejected,
} from '../slices/categories.slice';
import {
  fetchCitiesFulfilled,
  fetchCitiesPending,
  fetchCitiesRejected,
} from '../slices/cities.slice';

export class DictionariesService {
  dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  onAddNewCategory =
    (title: string, isActive: boolean, icon: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const body: ICreateCategoryBody = {
          name: title,
          is_active: isActive,
          icon,
        };
        const response = await createCategory(body);
        this.dispatch(this.getAllCategories());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  onEditCategory =
    (id: number, title?: string, isActive?: boolean, icon?: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const body: IEditCategoryBody = {
          name: title,
          is_active: isActive,
          icon,
          id_category: id,
        };
        const response = await editCategory(body);

        this.dispatch(this.getAllCategories());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  onDeleteCategory =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await deleteCategory(id);
        this.dispatch(this.getAllCategories());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  onAddNewCity =
    (title: string, isActive: boolean) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const body: ICreateCityBody = {
          name: title,
          is_active: isActive,
        };
        const response = await createCity(body);
        this.dispatch(this.getAllCities());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  onEditCity =
    (id: number, title?: string, isActive?: boolean) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const body: IEditCityBody = {
          name: title,
          is_active: isActive,
          id_city: id,
        };
        const response = await editCity(body);
        this.dispatch(this.getAllCities());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  onDeleteCity =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await deleteCity(id);
        this.dispatch(this.getAllCities());
      } catch (e: any) {
        console.error(e.message);
      }
    };

  getAllCategories =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchCategoriesPending());

        const response = await getAllCategories();
        const categories: ICategory[] = response.data.map((category) => ({
          title: category.name,
          icon: category.icon,
          id: category.id,
          isActive: category.is_active,
          value: category.name,
        }));

        dispatch(fetchCategoriesFulfilled(categories));
      } catch (e: any) {
        console.error(e);
        dispatch(fetchCategoriesRejected(e.message));
      }
    };

  getAllCities =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchCitiesPending());

        const response = await getAllCities();
        const cities: ICity[] = response.data.map((city) => ({
          title: city.name,
          isActive: city.is_active,
          id: city.id,
          value: city.name,
        }));

        dispatch(fetchCitiesFulfilled(cities));
      } catch (e: any) {
        console.error(e.message);
        dispatch(fetchCitiesRejected(e.message));
      }
    };
}
