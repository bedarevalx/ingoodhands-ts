import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';
import { IMyAd } from '../../../interfaces/profile.interfaces';

interface IErrors {
  checkCodeError: string;
  sendCodeError: string;
  editProfileError: string;
}

interface IMyAdsState {
  isLoading: boolean;
  error: string;
  ads: IMyAd[];
  page: number;
  totalPages: number;
}

const initialState: IMyAdsState = {
  isLoading: true,
  error: '',
  ads: [],
  page: 1,
  totalPages: 0,
};

export const myAdsSlice = createSlice({
  name: 'my-ads',
  initialState,
  reducers: {
    fetchMyAdsPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchMyAdsFulfilled: (state, action: PayloadAction<IMyAd[]>) => {
      state.isLoading = false;
      state.ads = action.payload;
      state.error = '';
    },
    fetchMyAdsRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  fetchMyAdsFulfilled,
  fetchMyAdsPending,
  fetchMyAdsRejected,
  setPage,
  setTotalPages,
} = myAdsSlice.actions;
export const reducer = myAdsSlice.reducer;
