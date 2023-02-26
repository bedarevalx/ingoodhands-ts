import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IErrorUI } from '../../../interfaces/general.interfaces';

interface IErrors {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  signUp: string;
  city: string;
}

interface ISignUpState {
  isLoading: boolean;
  email: string;
  password: string;
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
  phoneNumber: '',
  city: '',
  name: '',
  alert: '',
  //   getPasswordStrength: null,
  errors: {
    email: '',
    password: '',
    phoneNumber: '',
    name: '',
    signUp: '',
    city: '',
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
      // state.passwordRepeat = action.payload;
    },
    setError: (state, action: PayloadAction<IErrorUI>) => {
      state.errors[action.payload.type as keyof IErrors] =
        action.payload.message;
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
} = signUpSlice.actions;
export const reducer = signUpSlice.reducer;
