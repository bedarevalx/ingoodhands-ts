import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../../interfaces/ads.interfaces';
import { DealsSearchParamTypes } from '../../../types/ads.types';
import {
  IDeal,
  IReservation,
} from '../../../interfaces/reservations.interfaces';

interface IDealsState {
  isLoading: boolean;
  error: string;
  deals: IDeal[];
  page: number;
  totalPages: number;
  limit: number;
  param: string;
  isReviewModalOpened: boolean;
  isReviewLodaing: boolean;
  idReservation?: number;
}

const initialState: IDealsState = {
  isLoading: true,
  error: '',
  deals: [],
  param: JSON.stringify(['order', 'confirm_sent']),
  isReviewModalOpened: false,
  isReviewLodaing: false,
  page: 1,
  totalPages: 0,
  limit: 4,
};

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    fetchDealsPending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.deals = [];
    },
    fetchDealsFulfilled: (state, action: PayloadAction<IDeal[]>) => {
      state.isLoading = false;
      state.deals = action.payload;
      state.error = '';
    },
    fetchDealsRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    setSearchParam: (state, action: PayloadAction<string>) => {
      state.param = action.payload;
    },

    clearState: (state) => {
      state.page = 1;
      state.totalPages = 0;
      state.isLoading = true;
      state.deals = [];
      state.error = '';
    },
    setReviewModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalOpened = action.payload;
    },
    setIsReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.isReviewLodaing = action.payload;
    },
    setIdReservation: (state, action: PayloadAction<number>) => {
      state.idReservation = action.payload;
    },
  },
});

export const {
  fetchDealsFulfilled,
  fetchDealsPending,
  fetchDealsRejected,
  setPage,
  setTotalPages,
  setSearchParam,
  clearState,
  setIdReservation,
  setIsReviewLoading,
  setReviewModalOpened,
} = dealsSlice.actions;
export const reducer = dealsSlice.reducer;
