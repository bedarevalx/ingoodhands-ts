import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../../interfaces/general.interfaces';

interface IErrors {
  fetchError: string;
  createError: string;
}
interface ICategoriesSlice {
  title: string;
  icon: string;
  isModalVisible: boolean;
  isEditing: boolean;
  categoryToEdit: ICategory | null;
  isActive: boolean;
  categories: ICategory[];
  isLoading: boolean;
  isFetching: boolean;
  errors: IErrors;
}

const initialState: ICategoriesSlice = {
  categories: [],
  title: '',
  icon: '',
  isActive: true,
  isModalVisible: false,
  isEditing: false,
  categoryToEdit: null,
  isLoading: false,
  isFetching: true,
  errors: {
    fetchError: '',
    createError: '',
  },
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setModalIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setCategoryToEdit: (state, action: PayloadAction<ICategory>) => {
      state.categoryToEdit = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchCategoriesPending: (state) => {
      state.isFetching = true;
      state.errors.fetchError = '';
    },
    fetchCategoriesFulfilled: (state, action: PayloadAction<ICategory[]>) => {
      state.isFetching = false;
      state.categories = action.payload;
      state.errors.fetchError = '';
    },
    fetchCategoriesRejected: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.errors.fetchError = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errors.createError = action.payload;
    },
  },
});

export const {
  setCategoryToEdit,
  setIcon,
  setIsActive,
  setIsEditing,
  setModalIsVisible,
  setTitle,
  fetchCategoriesFulfilled,
  fetchCategoriesPending,
  fetchCategoriesRejected,
  setError,
  setIsLoading,
} = categoriesSlice.actions;
export const reducer = categoriesSlice.reducer;
// export authSlice.reducer;
