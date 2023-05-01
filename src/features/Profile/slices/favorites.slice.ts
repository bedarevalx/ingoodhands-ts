import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserAd } from '../../../interfaces/profile.interfaces';

interface IMyAdsState {
  isLoading: boolean;
  error: string;
  ads: IUserAd[];
  page: number;
  totalPages: number;
  favoritesId: number[];
}

const initialState: IMyAdsState = {
  isLoading: true,
  error: '',
  ads: [],
  page: 1,
  totalPages: 0,
  favoritesId: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchFavoritesFulfilled: (state, action: PayloadAction<IUserAd[]>) => {
      state.isLoading = false;
      state.ads = action.payload;
      state.error = '';
    },
    fetchFavoritesRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFavoritesId: (state, action: PayloadAction<number[]>) => {
      state.favoritesId = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setFavoriteById: (state, action: PayloadAction<number>) => {
      state.favoritesId.push(action.payload);
      state.ads = state.ads.map((ad) => {
        if (ad.id === action.payload) {
          return { ...ad, isFavorited: true };
        } else {
          return ad;
        }
      });
    },
    removeFavoriteById: (state, action: PayloadAction<number>) => {
      state.favoritesId = state.favoritesId.filter(
        (id) => id !== action.payload,
      );
      state.ads = state.ads.map((ad) => {
        if (ad.id === action.payload) {
          return { ...ad, isFavorited: false };
        } else {
          return ad;
        }
      });
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearState: (state) => {
      state.page = 1;
      state.totalPages = 0;
      state.isLoading = true;
      state.ads = [];
      state.error = '';
    },
  },
});

export const {
  fetchFavoritesFulfilled,
  fetchFavoritesPending,
  fetchFavoritesRejected,
  setPage,
  setTotalPages,
  clearState,
  setFavoriteById,
  removeFavoriteById,
  setFavoritesId,
  setError,
} = favoritesSlice.actions;
export const reducer = favoritesSlice.reducer;
