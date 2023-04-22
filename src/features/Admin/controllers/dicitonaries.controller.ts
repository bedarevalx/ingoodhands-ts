import { AppDispatch, RootState, store } from '../../../store';
import { IDictionariesController } from '../../../interfaces/admin.interfaces';
import { DictionariesService } from '..';
import { ICategory, ICity } from '../../../interfaces/general.interfaces';
import {
  setCityToEdit,
  setIsActive as setCityIsActive,
  setIsEditing as setCityIsEditing,
  setModalIsVisible as setCityModalIsVisible,
  setTitle as setCityTitle,
} from '../slices/cities.slice';
import {
  setCategoryToEdit,
  setIsActive as setCategoryIsActive,
  setIsEditing as setCategoryIsEditing,
  setModalIsVisible as setCategoryModalIsVisible,
  setTitle as setCategoryTitle,
  setIcon as setCategoryIcon,
} from '../slices/categories.slice';
import { ChangeEvent } from 'react';

export class DictionariesController implements IDictionariesController {
  dispatch: AppDispatch;
  getState: () => RootState;
  dictionariesService: DictionariesService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.dictionariesService = new DictionariesService(dispatch);
  }

  getAllCategories = () => {
    this.dispatch(this.dictionariesService.getAllCategories());
  };

  getAllCities = () => {
    this.dispatch(this.dictionariesService.getAllCities());
  };

  onAddNewCategory = () => {
    const categories = this.getState().categories;

    this.dispatch(
      this.dictionariesService.onAddNewCategory(
        categories.title,
        categories.isActive,
        categories.icon,
      ),
    );
  };

  onEditCategory = () => {
    const categories = this.getState().categories;
    if (categories.categoryToEdit) {
      const params = {
        title:
          categories.categoryToEdit.title !== categories.title
            ? categories.title
            : undefined,
        icon:
          categories.categoryToEdit.icon !== categories.icon
            ? categories.icon
            : undefined,
        isActive:
          categories.categoryToEdit.isActive !== categories.isActive
            ? categories.isActive
            : undefined,
      };
      this.dispatch(
        this.dictionariesService.onEditCategory(
          categories.categoryToEdit.id,
          params.title,
          params.isActive,
          params.icon,
        ),
      );
    }
  };

  onDeleteCategory = (id: number) => {
    this.dispatch(this.dictionariesService.onDeleteCategory(id));
  };

  onAddNewCity = () => {
    const cities = this.getState().cities;

    this.dispatch(
      this.dictionariesService.onAddNewCity(cities.title, cities.isActive),
    );
  };

  onEditCity = () => {
    const cities = this.getState().cities;

    if (cities.cityToEdit) {
      const params = {
        title:
          cities.cityToEdit.title !== cities.title ? cities.title : undefined,
        isActive:
          cities.cityToEdit.isActive !== cities.isActive
            ? cities.isActive
            : undefined,
      };
      this.dispatch(
        this.dictionariesService.onEditCity(
          cities.cityToEdit.id,
          params.title,
          params.isActive,
        ),
      );
    }
  };

  onDeleteCity = (id: number) => {
    this.dispatch(this.dictionariesService.onDeleteCity(id));
  };

  handleCityAdd = () => {
    this.dispatch(setCityModalIsVisible(true));
    this.dispatch(setCityIsEditing(false));
    this.dispatch(setCityTitle(''));
    this.dispatch(setCityIsActive(true));
  };

  handleCategoryAdd = () => {
    this.dispatch(setCategoryModalIsVisible(true));
    this.dispatch(setCategoryIsEditing(false));
    this.dispatch(setCategoryTitle(''));
    this.dispatch(setCategoryIcon(''));
    this.dispatch(setCategoryIsActive(true));
  };

  handleCityEdit = () => {
    const cities = this.getState().cities;
    this.dispatch(setCityModalIsVisible(true));
    this.dispatch(setCityIsEditing(true));
    if (cities.cityToEdit !== null) {
      this.dispatch(setCityTitle(cities.cityToEdit.title));
      this.dispatch(setCityIsActive(cities.cityToEdit.isActive));
    }
  };

  handleCategoryEdit = () => {
    const categories = this.getState().categories;
    this.dispatch(setCategoryModalIsVisible(true));
    this.dispatch(setCategoryIsEditing(true));
    if (categories.categoryToEdit !== null) {
      this.dispatch(setCategoryTitle(categories.categoryToEdit.title));
      this.dispatch(setCategoryIsActive(categories.categoryToEdit.isActive));
      this.dispatch(setCategoryIcon(categories.categoryToEdit.icon));
    }
  };

  setMenuToCity = (city: ICity) => {
    this.dispatch(setCityToEdit(city));
  };

  setMenuToCategory = (category: ICategory) => {
    this.dispatch(setCategoryToEdit(category));
  };

  handleCityModalClose = () => {
    this.dispatch(setCityModalIsVisible(false));
  };
  handleCategoryModalClose = () => {
    this.dispatch(setCategoryModalIsVisible(false));
  };

  handleCityTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setCityTitle(e.target.value));
  };

  handleCityActivityChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setCityIsActive(e.target.checked));
  };

  handleCategoryTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setCategoryTitle(e.target.value));
  };
  handleCategoryIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setCategoryIcon(e.target.value));
  };
  handleCategoryActivityChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setCategoryIsActive(e.target.checked));
  };
  handleCityDelete = () => {
    const cities = this.getState().cities;
    if (cities.cityToEdit !== null) {
      this.dispatch(
        this.dictionariesService.onDeleteCity(cities.cityToEdit.id),
      );
    }
  };

  handleCategoryDelete = () => {
    const categories = this.getState().categories;
    if (categories.categoryToEdit !== null) {
      this.dispatch(
        this.dictionariesService.onDeleteCategory(categories.categoryToEdit.id),
      );
    }
  };
}
