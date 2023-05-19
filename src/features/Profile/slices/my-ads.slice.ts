import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserAd } from '../../../interfaces/profile.interfaces';
import { AdsStatusTypes } from '../../../types/general.types';

interface IMyAdsState {
  isLoading: boolean;
  error: string;
  ads: IUserAd[];
  page: number;
  totalPages: number;
  param: AdsStatusTypes | '';
  limit: number;
}

const initialState: IMyAdsState = {
  isLoading: true,
  error: '',
  param: '',
  ads: [],
  page: 1,
  totalPages: 0,
  limit: 6,
};

export const myAdsSlice = createSlice({
  name: 'my-ads',
  initialState,
  reducers: {
    fetchMyAdsPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchMyAdsFulfilled: (state, action: PayloadAction<IUserAd[]>) => {
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
    setParam: (state, action: PayloadAction<AdsStatusTypes | ''>) => {
      state.param = action.payload;
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
  fetchMyAdsFulfilled,
  fetchMyAdsPending,
  fetchMyAdsRejected,
  setPage,
  setTotalPages,
  setParam,
  clearState,
} = myAdsSlice.actions;
export const reducer = myAdsSlice.reducer;
