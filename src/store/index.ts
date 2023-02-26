import { configureStore } from '@reduxjs/toolkit';
import { authReducer, signInReducer, signUpReducer } from '../features/Auth';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
