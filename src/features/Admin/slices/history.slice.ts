import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../../interfaces/general.interfaces';
import { IAdPreview } from '../../../interfaces/ads.interfaces';

interface IHistorySlice {
  isLoading: boolean;
  ads: IAdPreview[];
  limit: number;
  page: number;
  totalPages: number;
}

const initialState: IHistorySlice = {
  isLoading: false,
  ads: [],
  limit: 5,
  page: 1,
  totalPages: 0,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setAds: (state, action: PayloadAction<IAdPreview[]>) => {
      state.ads = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setAds, setPage, setIsLoading, setTotalPages } =
  historySlice.actions;
export const reducer = historySlice.reducer;
