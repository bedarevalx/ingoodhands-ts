import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../../interfaces/general.interfaces';
import { IPendingAds } from '../../../interfaces/ads.interfaces';

type IParamType = 'pending' | 'review';

interface IAdsSlice {
  isLoading: boolean;
  ads: IPendingAds[];
  limit: number;
  page: number;
  totalPages: number;
  param: IParamType;
}

const initialState: IAdsSlice = {
  isLoading: false,
  ads: [],
  limit: 5,
  page: 1,
  totalPages: 0,
  param: 'pending',
};

export const adsAdminSlice = createSlice({
  name: 'ads-admin',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setAds: (state, action: PayloadAction<IPendingAds[]>) => {
      state.ads = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setParam: (state, action: PayloadAction<IParamType>) => {
      state.param = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setAds, setPage, setIsLoading, setTotalPages, setParam } =
  adsAdminSlice.actions;
export const reducer = adsAdminSlice.reducer;
// export authSlice.reducer;
