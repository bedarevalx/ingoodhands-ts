import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios/axios';

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
}

const initialState: IAuthState = {
  isLoading: false,
  isAuthenticate: false,
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
} = authSlice.actions;
export const reducer = authSlice.reducer;
// export authSlice.reducer;
