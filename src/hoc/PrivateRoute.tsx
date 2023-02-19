import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import HomePage from '../pages/HomePage';

interface IPrivateProps {
  children: JSX.Element;
  reverseAuth?: boolean;
}

const PrivateRoute = (props: IPrivateProps) => {
  const auth = useAppSelector((state) => state.auth);

  if (props.reverseAuth) {
    return !auth?.isAuthenticate ? props.children : <Navigate to={'/'} />;
  }

  return auth?.isAuthenticate ? (
    <React.Suspense fallback={<div>Loading...</div>}>
      {props.children}
    </React.Suspense>
  ) : (
    <HomePage />
  );
};

export default PrivateRoute;
