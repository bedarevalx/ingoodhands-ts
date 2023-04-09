import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdPreview } from '../../../interfaces/ads.interfaces';
import { IUser } from '../../../interfaces/auth.interfaces';
import { IAddressResponse } from '../../../interfaces/responses.interfaces';

interface ILoaders {
  isEmailSending: boolean;
  isCodeChecking: boolean;
  isEditSending: boolean;
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
  isEditing: boolean;
  nameInput: string;
  emailInput: string;
  phoneInput: string;
  citySelect: string;
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
  isEditSending: false,
};
const initialState: IProfileState = {
  isLoading: true,
  error: '',
  emailCode: '',
  ads: [],
  isConfirmEmailSended: false,
  isEditing: false,
  modalsVisible: { ...modalsVisible },
  loaders: { ...loaders },
  errors: { ...errors },
  nameInput: '',
  emailInput: '',
  phoneInput: '',
  citySelect: '',
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
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setNameInput: (state, action: PayloadAction<string>) => {
      state.nameInput = action.payload;
    },
    setEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    setCitySelect: (state, action: PayloadAction<string>) => {
      state.citySelect = action.payload;
    },
    setPhoneInput: (state, action: PayloadAction<string>) => {
      state.phoneInput = action.payload;
    },
    startEditing: (state, action: PayloadAction<IUser>) => {
      state.emailInput = action.payload.email;
      state.phoneInput = action.payload.phoneNumber;
      state.nameInput = action.payload.name;
      state.citySelect = String(action.payload.city.id);
    },
    editPending: (state) => {
      state.loaders.isEditSending = true;
    },
    editFulfilled: (state) => {
      state.loaders.isEditSending = false;
      state.isEditing = false;
    },
    editRejected: (state, action: PayloadAction<string>) => {
      state.loaders.isEditSending = false;
      state.errors.editProfileError = action.payload;
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
  setIsEditing,
  setNameInput,
  setCitySelect,
  setEmailInput,
  setPhoneInput,
  startEditing,
  editFulfilled,
  editRejected,
  editPending,
} = profileSlice.actions;
export const reducer = profileSlice.reducer;
