import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdsStatusTypes } from '../../../types/general.types';
import {
  IAddress,
  ICategory,
  ICity,
} from '../../../interfaces/general.interfaces';
import { IAdvert, IAdvertOnwer } from '../../../interfaces/ads.interfaces';

interface IAdvertState {
  isLoading: boolean;
  title: string;
  description: string;
  createdAt: string;
  id: number | null;
  status: AdsStatusTypes | null;
  user: IAdvertOnwer | null;
  viewCount: number | null;
  imageSet: string[];
  address: IAddress | null;
  error: string;
  city: ICity | null;
  category: ICategory | null;
}

const initialState: IAdvertState = {
  isLoading: true,
  title: '',
  description: '',
  createdAt: '',
  id: null,
  status: null,
  imageSet: [],
  user: null,
  viewCount: null,
  address: null,
  error: '',
  category: null,
  city: null,
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    fetchPostPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchPostFulfilled: (state, action: PayloadAction<IAdvert>) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.user = action.payload.user;
      state.id = action.payload.id;
      state.category = action.payload.category;
      state.city = action.payload.city;
      state.description = action.payload.description;
      state.imageSet = action.payload.imageSet;
      state.address = action.payload.address;
      state.status = action.payload.status;
      state.createdAt = action.payload.createdAt;
      state.viewCount = action.payload.viewCount;
      state.error = '';
    },
    fetchPostRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPost: (state) => {},

    clearState: (state) => {
      state.isLoading = true;
      state.title = '';
      state.description = '';
      state.createdAt = '';
      state.id = null;
      state.status = null;
      state.imageSet = [];
      state.user = null;
      state.viewCount = null;
      state.address = null;
      state.error = '';
      state.category = null;
      state.city = null;
    },
  },
});

export const {
  fetchPostFulfilled,
  fetchPostPending,
  fetchPostRejected,
  clearState,
} = advertSlice.actions;
export const reducer = advertSlice.reducer;
