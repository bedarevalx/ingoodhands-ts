import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview, IAdvert } from '../../../interfaces/ads.interfaces';
import { AdsSearchParamsTypes } from '../../../types/ads.types';

interface IAdsSearchSlice {
  ads: IAdvert[];
  isLoading: boolean;
  error: string;
  searchParam: AdsSearchParamsTypes;
  offset: number;
  limit: number;
  searchParamTitle: string;
  searchValue: string;
  page: number;
  totalPages: number;
}

const initialState: IAdsSearchSlice = {
  ads: [],
  isLoading: false,
  searchParam: 'title',
  searchParamTitle: 'названию',
  searchValue: '',
  offset: 0,
  page: 1,
  totalPages: 0,
  limit: 5,
  error: '',
};

export const adsSearchSlice = createSlice({
  name: 'ads-search',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<AdsSearchParamsTypes>) => {
      state.searchParam = action.payload;
    },
    setSearchParamTitle: (state, action: PayloadAction<string>) => {
      state.searchParamTitle = action.payload;
    },
    fetchSearchAdsPending: (state) => {
      state.ads = [];
      state.error = '';
      state.isLoading = true;
    },
    fetchSearchAdsFulfilled: (state, action: PayloadAction<IAdvert[]>) => {
      state.ads = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchSearchAdsRejected: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
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
  setIsLoading,
  setOffset,
  setSearchParam,
  fetchSearchAdsFulfilled,
  fetchSearchAdsPending,
  setSearchParamTitle,
  fetchSearchAdsRejected,
  setSearchValue,
  setPage,
  setTotalPages,
} = adsSearchSlice.actions;
export const reducer = adsSearchSlice.reducer;
// export authSlice.reducer;
