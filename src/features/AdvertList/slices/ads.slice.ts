import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';

interface IAuthState {
  isLoading: boolean;
  error: string;
  ads: IAdPreview[];
}

const initialState: IAuthState = {
  isLoading: true,
  error: '',
  ads: [],
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    fetchAdsPending: (state) => {
      state.isLoading = true;
    },
    fetchAdsFullfilled: (state, action: PayloadAction<IAdPreview[]>) => {
      state.ads = action.payload;
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
  },
});

export const {
  setLoading,
  fetchAdsFullfilled,
  fetchAdsPending,
  fetchAdsRejected,
  setAds,
} = adsSlice.actions;
export const reducer = adsSlice.reducer;
// export authSlice.reducer;
