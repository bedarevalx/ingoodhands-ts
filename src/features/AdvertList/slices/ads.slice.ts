import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';
import { SortByTypes, SortTypeTypes } from '../../../types/ads.types';

interface IAuthState {
  isLoading: boolean;
  error: string;
  ads: IAdPreview[];
  title: string;
  idCity: string;
  idCategory: string;
  sortBy: SortByTypes;
  sortType: SortTypeTypes;
  page: number;
  isLastPage: boolean;
}

const initialState: IAuthState = {
  isLoading: true,
  error: '',
  ads: [],
  title: '',
  idCategory: '',
  idCity: '',
  sortBy: 'date',
  sortType: 'desc',
  page: 1,
  isLastPage: false,
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    fetchAdsPending: (state) => {
      state.isLoading = true;
    },
    fetchAdsFullfilled: (state, action: PayloadAction<IAdPreview[]>) => {
      state.ads = [...state.ads, ...action.payload];
      state.isLoading = false;
    },
    fetchAdsRejected: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAds: (state, action: PayloadAction<any[]>) => {
      state.ads = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearAds: (state) => {
      state.ads = [];
      state.page = 1;
      state.isLastPage = false;
    },
    setIsLastPage: (state, action: PayloadAction<boolean>) => {
      state.isLastPage = action.payload;
    },
    setFavoriteById: (state, action: PayloadAction<number>) => {
      state.ads = state.ads.map((ad) => {
        if (ad.id === action.payload) {
          return { ...ad, isFavorite: true };
        } else {
          return ad;
        }
      });
    },
    removeFavoriteById: (state, action: PayloadAction<number>) => {
      state.ads = state.ads.map((ad) => {
        if (ad.id === action.payload) {
          return { ...ad, isFavorite: false };
        } else {
          return ad;
        }
      });
    },
    clearFilters: (state) => {
      state.title = '';
      state.idCategory = '';
      state.idCity = '';
      state.sortBy = 'date';
      state.sortType = 'desc';
      state.isLastPage = false;
    },
  },
});

export const {
  setLoading,
  fetchAdsFullfilled,
  fetchAdsPending,
  fetchAdsRejected,
  setPage,
  setAds,
  clearAds,
  setError,
  clearFilters,
  setIsLastPage,
  setFavoriteById,
  removeFavoriteById,
} = adsSlice.actions;
export const reducer = adsSlice.reducer;
