import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import HomePage from '../pages/HomePage';
import FullscreenSpinner from '../components/FullscreenSpinner';
import { UserPrivilegeTypes } from '../types/general.types';

interface IPrivateProps {
  children: JSX.Element;
  reverseAuth?: boolean;
  requiredRole?: UserPrivilegeTypes;
}

const PrivateRoute = (props: IPrivateProps) => {
  const auth = useAppSelector((state) => state.auth);

  if (props.reverseAuth) {
    return !auth?.isAuthenticate ? props.children : <Navigate to={'/'} />;
  }

  if (!auth.isLoading && !!props.requiredRole) {
    const isHavePermission = auth.user.privileges.includes(props.requiredRole);
    if (!isHavePermission) {
      return <Navigate to={'/'} />;
    }
  }

  return auth?.isAuthenticate ? (
    <React.Suspense fallback={<FullscreenSpinner />}>
      {props.children}
    </React.Suspense>
  ) : (
    <Navigate to={'/sign-up'} />
  );
};

export default PrivateRoute;
