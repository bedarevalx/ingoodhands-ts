import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdsStatusTypes } from '../../../types/general.types';
import {
  IAddress,
  ICategory,
  ICity,
} from '../../../interfaces/general.interfaces';
import {
  IAdPreview,
  IAdvert,
  IAdvertOnwer,
  IReview,
} from '../../../interfaces/ads.interfaces';
import { IContactResponse } from '../../../interfaces/responses.interfaces';

interface IAdvertState {
  isLoading: boolean;
  isNumberLoading: boolean;
  isSimilarPostsLoading: boolean;
  isReviewsLoading: boolean;
  similarPosts: IAdPreview[];
  title: string;
  description: string;
  createdAt: string;
  id: number | null;
  status: AdsStatusTypes | null;
  user: IAdvertOnwer | null;
  viewCount: number | null;
  imageSet: string[];
  address?: IAddress;
  error: string;
  city: ICity | null;
  category: ICategory | null;
  phoneNumber?: string;
  reviews: IReview[];
  reviewsPage: number;
  reviewsLimit: number;
  isLastReviewsPage: boolean;
  isReservationLoading: boolean;
  isReservationModalOpen: boolean;
}

const initialState: IAdvertState = {
  isLoading: true,
  isNumberLoading: false,
  isReviewsLoading: false,
  isSimilarPostsLoading: true,
  similarPosts: [],
  title: '',
  description: '',
  createdAt: '',
  id: null,
  status: null,
  imageSet: [],
  user: null,
  viewCount: null,
  error: '',
  category: null,
  city: null,
  reviews: [],
  reviewsPage: 1,
  reviewsLimit: 5,
  isLastReviewsPage: false,
  isReservationLoading: false,
  isReservationModalOpen: false,
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    fetchPostPending: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    fetchPostFulfilled: (state, action: PayloadAction<IAdvert>) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.user = action.payload.user;
      state.id = action.payload.id;
      state.category = action.payload.category;
      state.city = action.payload.city;
      state.description = action.payload.description;
      state.imageSet = action.payload.imageSet;
      state.address = action.payload.address;
      state.status = action.payload.status;
      state.createdAt = action.payload.createdAt;
      state.viewCount = action.payload.viewCount;
      state.phoneNumber = action.payload.phoneNumber;
      state.error = '';
    },
    fetchPostRejected: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPost: (state) => {},

    fetchContactsPending: (state) => {
      state.isNumberLoading = true;
    },
    fetchContactsFulFilled: (
      state,
      action: PayloadAction<IContactResponse>,
    ) => {
      state.isNumberLoading = false;
      state.phoneNumber = action.payload.phone;
      state.address = action.payload.address;
    },
    fetchContactsRejected: (state) => {
      state.isNumberLoading = false;
    },

    fetchSimilarPostsPending: (state) => {
      state.isSimilarPostsLoading = true;
    },
    fetchSimilarPostsFulFilled: (
      state,
      action: PayloadAction<IAdPreview[]>,
    ) => {
      state.isSimilarPostsLoading = false;
      state.similarPosts = action.payload;
    },
    fetchSimilarPostsRejected: (state, action: PayloadAction<IAdPreview[]>) => {
      state.isSimilarPostsLoading = false;
    },

    setReviewsLoading: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoading = action.payload;
    },
    setReviews: (state, action: PayloadAction<IReview[]>) => {
      state.reviews = [...state.reviews, ...action.payload];
    },
    setIsLastReviewsPage: (state, action: PayloadAction<boolean>) => {
      state.isLastReviewsPage = action.payload;
    },
    setReviewsPage: (state, action: PayloadAction<number>) => {
      state.reviewsPage = action.payload;
    },
    setIsReservationLoading: (state, action: PayloadAction<boolean>) => {
      state.isReservationLoading = action.payload;
    },
    setIsReservationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isReservationModalOpen = action.payload;
    },

    clearState: (state) => {
      state.isLoading = true;
      state.title = '';
      state.description = '';
      state.createdAt = '';
      state.id = null;
      state.status = null;
      state.imageSet = [];
      state.user = null;
      state.viewCount = null;
      state.address = undefined;
      state.error = '';
      state.category = null;
      state.city = null;
      state.phoneNumber = undefined;
      state.reviews = [];
      state.isLastReviewsPage = true;
      state.reviewsPage = 1;
    },
  },
});

export const {
  fetchPostFulfilled,
  fetchPostPending,
  fetchPostRejected,
  clearState,
  fetchContactsFulFilled,
  fetchContactsPending,
  fetchContactsRejected,
  fetchSimilarPostsFulFilled,
  fetchSimilarPostsPending,
  fetchSimilarPostsRejected,
  setPost,
  setReviews,
  setReviewsLoading,
  setIsLastReviewsPage,
  setReviewsPage,
  setIsReservationLoading,
  setIsReservationModalOpen,
} = advertSlice.actions;
export const reducer = advertSlice.reducer;
