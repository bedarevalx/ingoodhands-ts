import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../../../interfaces/general.interfaces';

interface IErrors {
  fetchError: string;
  createError: string;
}
interface ICitiesSlice {
  title: string;
  isModalVisible: boolean;
  isEditing: boolean;
  cityToEdit: ICity | null;
  isActive: boolean;
  cities: ICity[];
  isLoading: boolean;
  isFetching: boolean;
  errors: IErrors;
}

const initialState: ICitiesSlice = {
  cities: [],
  title: '',
  isActive: true,
  isModalVisible: false,
  isEditing: false,
  cityToEdit: null,
  isLoading: false,
  isFetching: true,
  errors: {
    fetchError: '',
    createError: '',
  },
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
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
    setCityToEdit: (state, action: PayloadAction<ICity>) => {
      state.cityToEdit = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchCitiesPending: (state) => {
      state.isFetching = true;
      state.errors.fetchError = '';
    },
    fetchCitiesFulfilled: (state, action: PayloadAction<ICity[]>) => {
      state.isFetching = false;
      state.cities = action.payload;
      state.errors.fetchError = '';
    },
    fetchCitiesRejected: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.errors.fetchError = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errors.createError = action.payload;
    },
  },
});

export const {
  setCityToEdit,
  setError,
  setIsActive,
  setIsEditing,
  setIsLoading,
  setModalIsVisible,
  setTitle,
  fetchCitiesFulfilled,
  fetchCitiesPending,
  fetchCitiesRejected,
} = citiesSlice.actions;
export const reducer = citiesSlice.reducer;
// export authSlice.reducer;
