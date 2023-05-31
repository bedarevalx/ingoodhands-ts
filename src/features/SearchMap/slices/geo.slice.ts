import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios/in-good-hands.axios';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';
import { IAddress } from '../../../interfaces/general.interfaces';
import {
  IPickedAddress,
  ISearchedAddress,
} from '../../../interfaces/geo.interfaces';

interface IEditAdState {
  isLoading: boolean;
  pickedAddress: IPickedAddress;
  title: string;
  inputValue: string;
  latitude: string;
  longitude: string;
  searchedItems: ISearchedAddress[];
  cityValue?: string;
}

const initialState: IEditAdState = {
  isLoading: false,
  inputValue: '',
  pickedAddress: { title: '', latitude: 0, longitude: 0 },
  title: '',
  latitude: '',
  longitude: '',
  searchedItems: [],
};

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPickedAddress: (state, action: PayloadAction<IPickedAddress>) => {
      state.pickedAddress = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setSearchedItems: (state, action: PayloadAction<ISearchedAddress[]>) => {
      state.searchedItems = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.cityValue = action.payload;
    },
  },
});

export const {
  setLoading,
  setTitle,
  setInputValue,
  setPickedAddress,
  setSearchedItems,
  setCity,
} = geoSlice.actions;
export const reducer = geoSlice.reducer;
// export authSlice.reducer;
