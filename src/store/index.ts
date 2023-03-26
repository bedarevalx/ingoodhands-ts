import { configureStore } from '@reduxjs/toolkit';
import { authReducer, signInReducer, signUpReducer } from '../features/Auth';
import { appReducer } from './app.slice';
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
