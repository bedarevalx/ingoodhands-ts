import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IErrors {
  auth: string;
}
interface IAuthState {
  isLoading: boolean;
  isAuthenticate: boolean;
  errors: IErrors;
}

const initialState: IAuthState = {
  isLoading: false,
  isAuthenticate: false,
  errors: {
    auth: '',
  },
};

export const signinSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticatePending: (state) => {
      state.isLoading = true;
    },
    authenticateSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticate = true;
      state.isLoading = false;
    },
    authenticateError: (state, action: PayloadAction<string>) => {
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
} = signinSlice.actions;
export const reducer = signinSlice.reducer;
