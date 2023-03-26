import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IErrorUI } from '../../../interfaces/general.interfaces';

interface IErrors {
  email: string;
  password: string;
  signIn: string;
}
interface IAuthState {
  isLoading: boolean;
  errors: IErrors;
  email: string;
  password: string;
}

const initialState: IAuthState = {
  isLoading: false,
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
    signIn: '',
  },
};

export const signinSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<IErrorUI>) => {
      state.errors[action.payload.type as keyof IErrors] =
        action.payload.message;
    },
    signInPending: (state) => {
      state.isLoading = true;
    },
    signInFullfilled: (state) => {
      state.isLoading = false;
    },
    signInRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors.signIn = action.payload;
    },
    clearValues: (state) => {
      state.isLoading = false;
      state.email = '';
      state.password = '';
      state.errors.email = '';
      state.errors.password = '';
    },
  },
});

export const {
  setLoading,
  setError,
  setPassword,
  setEmail,
  signInFullfilled,
  signInPending,
  signInRejected,
  clearValues,
} = signinSlice.actions;
export const reducer = signinSlice.reducer;
