import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios/in-good-hands.axios';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';

export const fetchUserProfile = createAsyncThunk<
  string,
  { rejectValue: string }
>('garantee/createPlacecount', async function (_, { rejectWithValue }) {
  try {
    const response = await axios.post('/api/placecount');
    if (response.status !== 201) {
      alert('Something went wrong!');
      return rejectWithValue('Server error!');
    }
    const data = response.data;
    alert('Success!');

    return data;
  } catch (error) {
    alert('server error!!');
    return rejectWithValue('Server error!');
  }
});
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
    idCity: '',
    isAdmin: false,
    phoneNumber: '',
    addresses: [],
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
        idCity: '',
        isAdmin: false,
        phoneNumber: '',
        addresses: [],
      };
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
  authenticateFullfilled,
  authenticateRejected,
  setUser,
  signOut,
} = authSlice.actions;
export const reducer = authSlice.reducer;
// export authSlice.reducer;
