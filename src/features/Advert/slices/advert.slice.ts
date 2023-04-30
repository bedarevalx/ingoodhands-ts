import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdsStatusTypes } from '../../../types/general.types';
import {
  IAddress,
  ICategory,
  ICity,
} from '../../../interfaces/general.interfaces';
import {
  IAdPreview,
  IAdvert,
  IAdvertOnwer,
} from '../../../interfaces/ads.interfaces';
import { IContactResponse } from '../../../interfaces/responses.interfaces';

interface IAdvertState {
  isLoading: boolean;
  isNumberLoading: boolean;
  isSimilarPostsLoading: boolean;
  similarPosts: IAdPreview[];
  title: string;
  description: string;
  createdAt: string;
  id: number | null;
  status: AdsStatusTypes | null;
  user: IAdvertOnwer | null;
  viewCount: number | null;
  imageSet: string[];
  address?: IAddress;
  error: string;
  city: ICity | null;
  category: ICategory | null;
  phoneNumber?: string;
}

const initialState: IAdvertState = {
  isLoading: true,
  isNumberLoading: false,
  isSimilarPostsLoading: true,
  similarPosts: [],
  title: '',
  description: '',
  createdAt: '',
  id: null,
  status: null,
  imageSet: [],
  user: null,
  viewCount: null,
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
      state.phoneNumber = action.payload.phoneNumber;
      state.error = '';
    },
    fetchPostRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPost: (state) => {},

    fetchContactsPending: (state) => {
      state.isNumberLoading = true;
    },
    fetchContactsFulFilled: (
      state,
      action: PayloadAction<IContactResponse>,
    ) => {
      state.isNumberLoading = false;
      state.phoneNumber = action.payload.phone;
      state.address = action.payload.address;
    },
    fetchContactsRejected: (state) => {
      state.isNumberLoading = false;
    },

    fetchSimilarPostsPending: (state) => {
      state.isSimilarPostsLoading = true;
    },
    fetchSimilarPostsFulFilled: (
      state,
      action: PayloadAction<IAdPreview[]>,
    ) => {
      state.isSimilarPostsLoading = false;
      state.similarPosts = action.payload;
    },
    fetchSimilarPostsRejected: (state, action: PayloadAction<IAdPreview[]>) => {
      state.isSimilarPostsLoading = false;
    },

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
      state.address = undefined;
      state.error = '';
      state.category = null;
      state.city = null;
      state.phoneNumber = undefined;
    },
  },
});

export const {
  fetchPostFulfilled,
  fetchPostPending,
  fetchPostRejected,
  clearState,
  fetchContactsFulFilled,
  fetchContactsPending,
  fetchContactsRejected,
  fetchSimilarPostsFulFilled,
  fetchSimilarPostsPending,
  fetchSimilarPostsRejected,
} = advertSlice.actions;
export const reducer = advertSlice.reducer;
