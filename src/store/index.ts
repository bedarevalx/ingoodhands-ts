import { configureStore } from '@reduxjs/toolkit';
import { authReducer, signInReducer, signUpReducer } from '../features/Auth';
import { adsReducer } from '../features/AdvertList';
import { appReducer } from './app.slice';
import { editAdReducer } from '../features/EditAdvert';
import { geoReducer } from '../features/SearchMap';
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    ads: adsReducer,
    editAd: editAdReducer,
    geo: geoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
