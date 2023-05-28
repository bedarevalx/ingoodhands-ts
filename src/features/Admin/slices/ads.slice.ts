import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../../interfaces/general.interfaces';
import { IAdPreview } from '../../../interfaces/ads.interfaces';

interface IAdsSlice {
  isLoading: boolean;
  ads: IAdPreview[];
  limit: number;
  page: number;
  totalPages: number;
}

const initialState: IAdsSlice = {
  isLoading: false,
  ads: [],
  limit: 5,
  page: 1,
  totalPages: 0,
};

export const adsAdminSlice = createSlice({
  name: 'ads-admin',
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
  adsAdminSlice.actions;
export const reducer = adsAdminSlice.reducer;
// export authSlice.reducer;
