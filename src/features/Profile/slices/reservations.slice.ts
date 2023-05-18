import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../../interfaces/ads.interfaces';
import { ReservationSearchParamTypes } from '../../../types/ads.types';
import { IReservation } from '../../../interfaces/reservations.interfaces';

interface IReservationsState {
  isLoading: boolean;
  error: string;
  reservations: IReservation[];
  page: number;
  totalPages: number;
  limit: number;
  param: ReservationSearchParamTypes;
}

const initialState: IReservationsState = {
  isLoading: true,
  error: '',
  reservations: [],
  param: 'incoming',
  page: 1,
  totalPages: 0,
  limit: 4,
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    fetchReservationsPending: (state) => {
      state.isLoading = true;
      state.reservations = [];
      state.error = '';
    },
    fetchReservationsFulfilled: (
      state,
      action: PayloadAction<IReservation[]>,
    ) => {
      state.isLoading = false;
      state.reservations = action.payload;
      state.error = '';
    },
    fetchReservationsRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    setSearchParam: (
      state,
      action: PayloadAction<ReservationSearchParamTypes>,
    ) => {
      state.param = action.payload;
    },

    clearState: (state) => {
      state.page = 1;
      state.totalPages = 0;
      state.isLoading = true;
      state.reservations = [];
      state.error = '';
    },
  },
});

export const {
  fetchReservationsFulfilled,
  fetchReservationsPending,
  fetchReservationsRejected,
  setPage,
  setTotalPages,
  setSearchParam,
  clearState,
} = reservationsSlice.actions;
export const reducer = reservationsSlice.reducer;
