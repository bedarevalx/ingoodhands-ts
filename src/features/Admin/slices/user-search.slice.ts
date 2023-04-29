import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersSearchParamsTypes } from '../../../types/admin.types';
import { ISearchedUser } from '../../../interfaces/admin.interfaces';

interface IUserSearchSlice {
  users: ISearchedUser[];
  isLoading: boolean;
  error: string;
  searchParam: UsersSearchParamsTypes;
  offset: number;
  limit: number;
  searchParamTitle: string;
  searchValue: string;
  page: number;
  totalPages: number;
}

const initialState: IUserSearchSlice = {
  users: [],
  isLoading: false,
  searchParam: 'id_user',
  searchParamTitle: 'ID пользователя',
  searchValue: '',
  offset: 0,
  page: 1,
  totalPages: 0,
  limit: 5,
  error: '',
};

export const usersSearchSlice = createSlice({
  name: 'users-search',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<UsersSearchParamsTypes>) => {
      state.searchParam = action.payload;
    },
    setSearchParamTitle: (state, action: PayloadAction<string>) => {
      state.searchParamTitle = action.payload;
    },
    fetchSearchUsersPending: (state) => {
      state.users = [];
      state.error = '';
      state.isLoading = true;
    },
    fetchSearchUsersFulfilled: (
      state,
      action: PayloadAction<ISearchedUser[]>,
    ) => {
      state.users = action.payload;
      state.error = '';
      state.isLoading = false;
    },
    fetchSearchUsersRejected: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setOffset,
  setSearchParam,
  fetchSearchUsersFulfilled,
  fetchSearchUsersPending,
  setSearchParamTitle,
  fetchSearchUsersRejected,
  setSearchValue,
  setPage,
  setTotalPages,
} = usersSearchSlice.actions;
export const reducer = usersSearchSlice.reducer;
// export authSlice.reducer;
