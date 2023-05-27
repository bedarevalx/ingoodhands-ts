import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddress, ICategory } from '../../../interfaces/general.interfaces';
import { IAdvert } from '../../../interfaces/ads.interfaces';

interface IErrors {
  errorConfirm: string;
  errorFetch: string;
}
interface IModerationSlice {
  isLoading: boolean;
  isConfirming: boolean;
  errors: IErrors;
  title: string;
  description: string;
  category: string;
  categoryIcon: string;
  city: string;
  address?: IAddress;
  imageSet: string[];
  moderationId: number | null;
  reason: string;
  isRejectModalOpened: boolean;
  isRejecting: boolean;
  isPublishing: boolean;
}

const initialState: IModerationSlice = {
  isRejectModalOpened: false,
  reason: '',
  isLoading: true,
  isConfirming: false,
  title: '',
  description: '',
  category: '',
  categoryIcon: '',
  city: '',
  moderationId: null,
  imageSet: [],
  errors: {
    errorConfirm: '',
    errorFetch: '',
  },
  isRejecting: false,
  isPublishing: false,
};

export const moderationSlice = createSlice({
  name: 'moderation',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.errors.errorFetch = action.payload;
    },
    setIsConfirming: (state, action: PayloadAction<boolean>) => {
      state.isConfirming = action.payload;
    },
    setModerationId: (state, action: PayloadAction<number>) => {
      state.moderationId = action.payload;
    },
    setReason: (state, action: PayloadAction<string>) => {
      state.reason = action.payload;
    },
    setIsRejecting: (state, action: PayloadAction<boolean>) => {
      state.isRejecting = action.payload;
    },
    setIsPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload;
    },

    setRejectModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isRejectModalOpened = action.payload;
    },
    setPost: (state, action: PayloadAction<IAdvert>) => {
      state.address = action.payload.address;
      state.category = action.payload.category.title;
      state.categoryIcon = action.payload.category.icon;
      state.city = action.payload.city.title;
      state.description = action.payload.description;
      state.imageSet = action.payload.imageSet;
      state.title = action.payload.title;
    },
  },
});

export const {
  setFetchError,
  setIsConfirming,
  setIsLoading,
  setPost,
  setReason,
  setRejectModalOpened,
  setIsPublishing,
  setIsRejecting,
  setModerationId,
} = moderationSlice.actions;
export const reducer = moderationSlice.reducer;
// export authSlice.reducer;
