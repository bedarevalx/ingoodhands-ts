import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IErrorUI } from '../../../interfaces/general.interfaces';

interface IErrors {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
  signUp: string;
  city: string;
}

interface ISignUpState {
  isLoading: boolean;
  email: string;
  password: string;
  passwordRepeat: string;
  passwordStrength: number | null;
  name: string;
  phoneNumber: string;
  alert: string;
  city: string;
  errors: IErrors;
}

const initialState: ISignUpState = {
  isLoading: false,
  email: '',
  password: '',
  passwordRepeat: '',
  passwordStrength: null,
  phoneNumber: '',
  city: '-1',
  name: '',
  alert: '',
  errors: {
    email: '',
    password: '',
    phoneNumber: '',
    name: '',
    signUp: '',
    city: '',
    passwordRepeat: '',
  },
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action: PayloadAction<string>) => {
      state.passwordRepeat = action.payload;
    },
    setError: (state, action: PayloadAction<IErrorUI>) => {
      state.errors[action.payload.type as keyof IErrors] =
        action.payload.message;
    },
    setPasswordStrength: (state, action: PayloadAction<number>) => {
      state.passwordStrength = action.payload;
    },
    signUpPending: (state) => {
      state.isLoading = true;
    },
    signUpFullfilled: (state) => {
      state.isLoading = false;
    },
    signUpRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors.signUp = action.payload;
    },
    clearValues: (state) => {
      state.isLoading = false;
      state.email = '';
      state.password = '';
      state.passwordRepeat = '';
      state.phoneNumber = '';
      state.city = '-1';
      state.name = '';
      state.alert = '';
      state.errors.email = '';
      state.errors.password = '';
      state.errors.phoneNumber = '';
      state.errors.name = '';
      state.errors.signUp = '';
      state.errors.city = '';
      state.errors.passwordRepeat = '';
      state.passwordStrength = null;
    },
  },
});

export const {
  setEmail,
  setName,
  setCity,
  setError,
  setPassword,
  setPasswordRepeat,
  setPhoneNumber,
  signUpFullfilled,
  signUpRejected,
  signUpPending,
  setPasswordStrength,
  clearValues,
} = signUpSlice.actions;
export const reducer = signUpSlice.reducer;
