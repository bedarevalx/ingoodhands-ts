import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';

import { SortByTypes, SortTypeTypes } from '../../../types/ads.types';

interface IAuthState {
  isLoading: boolean;
  error: string;
  ads: IAdPreview[];
  title: string;
  idCity: string;
  idCategory: string;
  sortBy: SortByTypes;
  sortByTitle: string;
  sortType: SortTypeTypes;
  page: number;
  isLastPage: boolean;
}

const initialState: IAuthState = {
  isLoading: false,
  error: '',
  ads: [],
  title: '',
  idCategory: '',
  idCity: '-1',
  sortBy: 'date',
  sortByTitle: 'дате публикации',
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
    setCity: (state, action: PayloadAction<string>) => {
      state.idCity = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.idCategory = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortTypeTypes>) => {
      state.sortType = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<{ value: SortByTypes; title: string }>,
    ) => {
      state.sortBy = action.payload.value;
      state.sortByTitle = action.payload.title;
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
  setCategory,
  setCity,
  setTitle,
  setSortBy,
  setSortType,
} = adsSlice.actions;
export const reducer = adsSlice.reducer;
