import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios/axios';
import { ICategory, ICity } from '../interfaces/general.interfaces';

// export const fetchUserProfile = createAsyncThunk<
//   string,
//   { rejectValue: string }
// >('garantee/createPlacecount', async function (_, { rejectWithValue }) {
//   try {
//     const response = await axios.post('/api/placecount');
//     if (response.status !== 201) {
//       alert('Something went wrong!');
//       return rejectWithValue('Server error!');
//     }
//     const data = response.data;
//     alert('Success!');

//     return data;
//   } catch (error) {
//     alert('server error!!');
//     return rejectWithValue('Server error!');
//   }
// });
interface IErrors {
  auth: string;
}
interface IAuthState {
  isAppLoading: boolean;
  errors: IErrors;
  categories: ICategory[];
  cities: ICity[];
}
//TODO: Сделать типизированными категории
const initialState: IAuthState = {
  isAppLoading: true,
  categories: [],
  cities: [],
  errors: {
    auth: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.cities = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const { setCities, setCategories, setIsLoading } = appSlice.actions;
export const appReducer = appSlice.reducer;
