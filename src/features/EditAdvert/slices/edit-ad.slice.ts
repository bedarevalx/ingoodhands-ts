import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../axios/in-good-hands.axios';
import { IUser, IUserAddress } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';
import { IAddress } from '../../../interfaces/general.interfaces';
import { IPickedAddress } from '../../../interfaces/geo.interfaces';

interface IEditAdState {
  isLoading: boolean;
  isAddressSearchOpen: boolean;
  pickedAddress: string;
  category: string;
  description: string;
  isEditing: boolean;
  images: string[];
  title: string;
  newAddress: IUserAddress | null;
  error: string;
}

const initialState: IEditAdState = {
  isLoading: false,
  isAddressSearchOpen: false,
  pickedAddress: '-1',
  newAddress: null,
  title: '',
  category: '-1',
  description: '',
  isEditing: false,
  images: [],
  error: '',
};

export const editAdSlice = createSlice({
  name: 'edit-ad',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsAddressSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddressSearchOpen = action.payload;
    },
    setPickedAddress: (state, action: PayloadAction<string>) => {
      state.pickedAddress = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    loadImage: (state, action: PayloadAction<string[]>) => {
      state.images = [...state.images, ...action.payload];
    },
    setNewAddress: (state, action: PayloadAction<IUserAddress>) => {
      state.newAddress = action.payload;
    },
    addImages: (state, action: PayloadAction<string[]>) => {
      state.images.push(...action.payload);
    },
    deleteImage: (state, action: PayloadAction<string>) => {},
    createAdPending: (state) => {
      state.isLoading = true;
    },
    createAdFulfilled: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    createAdRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setIsAddressSearchOpen,
  setCategory,
  setDescription,
  setIsEditing,
  setTitle,
  loadImage,
  deleteImage,
  setNewAddress,
  setPickedAddress,
  addImages,
  createAdFulfilled,
  createAdRejected,
  createAdPending,
} = editAdSlice.actions;
export const reducer = editAdSlice.reducer;
// export authSlice.reducer;
