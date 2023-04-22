import React from 'react';
import { UserPrivilegeTypes } from '../types/general.types';
import { useAppSelector } from '../hooks/useRedux';

interface IRequiredRoleProps {
  role?: UserPrivilegeTypes;
  children: JSX.Element;
}

const RequiredRole = (props: IRequiredRoleProps) => {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.isAuthenticate) {
    return null;
  }

  if (!props.role) {
    return props.children;
  }

  if (auth.user.privileges.includes(props.role)) {
    return props.children;
  } else {
    return null;
  }
};

export default RequiredRole;
