import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';

interface ILoaders {
  isEmailSending: boolean;
  isCodeChecking: boolean;
}
interface IModalsOpened {
  isConfirmModalVisible: boolean;
}

interface IErrors {
  checkCodeError: string;
  sendCodeError: string;
  editProfileError: string;
}

interface IProfileState {
  isLoading: boolean;
  error: string;
  emailCode: string;
  isConfirmEmailSended: boolean;
  ads: IAdPreview[];
  modalsVisible: IModalsOpened;
  loaders: ILoaders;
  errors: IErrors;
}

const modalsVisible: IModalsOpened = {
  isConfirmModalVisible: false,
};

const errors: IErrors = {
  checkCodeError: '',
  sendCodeError: '',
  editProfileError: '',
};

const loaders: ILoaders = {
  isEmailSending: false,
  isCodeChecking: false,
};
const initialState: IProfileState = {
  isLoading: true,
  error: '',
  emailCode: '',
  ads: [],
  modalsVisible: { ...modalsVisible },
  loaders: { ...loaders },
  isConfirmEmailSended: false,
  errors: { ...errors },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    sendEmailPending: (state) => {
      state.loaders.isEmailSending = true;
    },
    sendEmailFullfilled: (state) => {
      state.loaders.isEmailSending = false;
      state.isConfirmEmailSended = true;
    },
    sendEmailRejected: (state, action: PayloadAction<string>) => {
      state.errors.sendCodeError = action.payload;
      state.loaders.isEmailSending = false;
    },

    checkCodePending: (state) => {
      state.loaders.isCodeChecking = true;
    },
    checkCodeFullfiled: (state) => {
      state.loaders.isCodeChecking = false;
      state.isConfirmEmailSended = true;
    },
    checkCodeRejected: (state, action: PayloadAction<string>) => {
      state.errors.checkCodeError = action.payload;
      state.loaders.isCodeChecking = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAds: (state, action: PayloadAction<any[]>) => {
      state.ads = action.payload;
    },
    openConfirmModal: (state) => {
      state.modalsVisible.isConfirmModalVisible = true;
    },
    closeConfirmModal: (state) => {
      state.modalsVisible.isConfirmModalVisible = false;
    },
    setEmailCode: (state, action: PayloadAction<string>) => {
      state.emailCode = action.payload;
    },
  },
});

export const {
  setLoading,
  sendEmailFullfilled,
  sendEmailPending,
  sendEmailRejected,
  setAds,
  openConfirmModal,
  closeConfirmModal,
  checkCodeFullfiled,
  checkCodePending,
  checkCodeRejected,
  setEmailCode,
} = profileSlice.actions;
export const reducer = profileSlice.reducer;
