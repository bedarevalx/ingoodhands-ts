import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import { AppService } from './app.service';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import LoaderHoc from './hoc/LoaderHoc';
import { AuthService } from './features/Auth';
import Snackbar from './components/Snackbar';

function App() {
  const dispatch = useAppDispatch();

  const appService = new AppService();
  const authService = new AuthService(dispatch);
  const app = useAppSelector((state) => state.app);
  const auth = useAppSelector((state) => state.auth);

  //подтягиваем профиль
  useEffect(() => {
    if (localStorage.accessToken?.length > 0) {
      authService.fetchUserProfile();
    }
  }, []);
  //подтягиваем города и категории
  useEffect(() => {
    dispatch(appService.getStartData());
  }, []);

  return (
    <div className='app'>
      <LoaderHoc isLoading={app.isAppLoading || auth.isLoading}>
        <>
          <Outlet />
          <Snackbar />
        </>
      </LoaderHoc>
    </div>
  );
}

export default App;
