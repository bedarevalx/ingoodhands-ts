import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../../interfaces/ads.interfaces';

interface IReviewsState {
  isLoading: boolean;
  error: string;
  reviews: IReview[];
  page: number;
  totalPages: number;
  limit: number;
}

const initialState: IReviewsState = {
  isLoading: true,
  error: '',
  reviews: [],
  page: 1,
  totalPages: 0,
  limit: 6,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    fetchReviewsPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchReviewsFulfilled: (state, action: PayloadAction<IReview[]>) => {
      state.isLoading = false;
      state.reviews = action.payload;
      state.error = '';
    },
    fetchReviewsRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    clearState: (state) => {
      state.page = 1;
      state.totalPages = 0;
      state.isLoading = true;
      state.reviews = [];
      state.error = '';
    },
  },
});

export const {
  fetchReviewsFulfilled,
  fetchReviewsPending,
  fetchReviewsRejected,
  setPage,
  setTotalPages,
  clearState,
} = reviewsSlice.actions;
export const reducer = reviewsSlice.reducer;
