import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IErrors {
  auth: string;
}
interface IAuthState {
  isLoading: boolean;
  isAuthenticate: boolean;
  errors: IErrors;
  accessToken: string;
}

const initialState: IAuthState = {
  isLoading: false,
  isAuthenticate: false,
  accessToken: '',
  errors: {
    auth: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticatePending: (state) => {
      state.isLoading = true;
    },
    authenticateSuccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticate = true;
      state.isLoading = false;
    },
    authenticateError: (state, action: PayloadAction<string>) => {
      state.accessToken = '';
      state.errors.auth = action.payload;
      state.isAuthenticate = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticate = action.payload;
    },
  },
});

export const {
  setLoading,
  setAuthenticate,
  authenticatePending,
  authenticateSuccess,
  authenticateError,
} = authSlice.actions;
export const reducer =  authSlice.reducer;
// export authSlice.reducer;
