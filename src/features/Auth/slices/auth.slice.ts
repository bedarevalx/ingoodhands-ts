import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/auth.interfaces';

interface IErrors {
  auth: string;
}
interface IAuthState {
  isLoading: boolean;
  isAuthenticate: boolean;
  errors: IErrors;
  user: IUser;
}

const initialState: IAuthState = {
  isLoading: false,
  isAuthenticate: false,
  errors: {
    auth: '',
  },
  user: {
    email: '',
    name: '',
    isBanned: false,
    isEmailVerified: false,
    id: '',
    city: { id: 0, isActive: true, name: '' },
    isAdmin: false,
    phoneNumber: '',
    addresses: [],
    privileges: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticatePending: (state) => {
      state.isLoading = true;
    },
    authenticateFullfilled: (state) => {
      state.isAuthenticate = true;
      state.isLoading = false;
    },
    authenticateRejected: (state, action: PayloadAction<string>) => {
      state.errors.auth = action.payload;
      state.isAuthenticate = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.isLoading = false;
      state.isAuthenticate = false;
      state.user = {
        email: '',
        name: '',
        isBanned: false,
        isEmailVerified: false,
        id: '',
        city: { id: 0, isActive: true, name: '' },
        isAdmin: false,
        phoneNumber: '',
        addresses: [],
        privileges: [],
      };
    },
    setAuthenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticate = action.payload;
    },
    updateEmailConfirm: (state, action: PayloadAction<boolean>) => {
      state.user.isEmailVerified = action.payload;
    },
  },
});

export const {
  setLoading,
  setAuthenticate,
  authenticatePending,
  authenticateFullfilled,
  authenticateRejected,
  setUser,
  signOut,
  updateEmailConfirm,
} = authSlice.actions;
export const reducer = authSlice.reducer;
// export authSlice.reducer;
