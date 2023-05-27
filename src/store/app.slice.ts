import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios/in-good-hands.axios';
import { ICategory, ICity } from '../interfaces/general.interfaces';

interface IErrors {
  auth: string;
}
interface IAuthState {
  isAppLoading: boolean;
  errors: IErrors;
  categories: ICategory[];
  cities: ICity[];
  snackbarSeverity: 'error' | 'success';
  snackbarText: string;
  isSnackbarOpen: boolean;
}
const initialState: IAuthState = {
  isAppLoading: true,
  categories: [],
  cities: [],
  errors: {
    auth: '',
  },
  snackbarSeverity: 'success',
  snackbarText: '',
  isSnackbarOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.cities = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
    setSnackbarSeverity: (
      state,
      action: PayloadAction<'success' | 'error'>,
    ) => {
      state.snackbarSeverity = action.payload;
    },
    setSnackbarText: (state, action: PayloadAction<string>) => {
      state.snackbarText = action.payload;
    },
    setIsSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSnackbarOpen = action.payload;
    },
  },
});

export const {
  setCities,
  setCategories,
  setIsLoading,
  setSnackbarSeverity,
  setSnackbarText,
  setIsSnackbarOpen,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
