import { configureStore } from '@reduxjs/toolkit';
import { authReducer, signInReducer, signUpReducer } from '../features/Auth';
import { adsReducer } from '../features/AdvertList';
import { appReducer } from './app.slice';
import { editAdReducer } from '../features/EditAdvert';
import { geoReducer } from '../features/SearchMap';
import {
  myAdsReducer,
  profileReducer,
  favoritesReducer,
  reviewsReducer,
  reservationsReducer,
  dealsReducer,
} from '../features/Profile';
import {
  categoriesReducer,
  citiesReducer,
  adsSearchReducer,
  userSearchReducer,
  adminAdsReducer,
  moderationReducer,
  historyReducer,
} from '../features/Admin';
import { advertReducer } from '../features/Advert';
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    ads: adsReducer,
    editAd: editAdReducer,
    geo: geoReducer,
    profile: profileReducer,
    myAds: myAdsReducer,
    favorites: favoritesReducer,
    cities: citiesReducer,
    categories: categoriesReducer,
    advert: advertReducer,
    adsSearch: adsSearchReducer,
    userSearch: userSearchReducer,
    adminAds: adminAdsReducer,
    moderation: moderationReducer,
    reviews: reviewsReducer,
    reservations: reservationsReducer,
    deals: dealsReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
