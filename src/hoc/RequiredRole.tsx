import React from 'react';
import { UserPrivilegeTypes } from '../types/general.types';
import { useAppSelector } from '../hooks/useRedux';

interface IRequiredRoleProps {
  role?: UserPrivilegeTypes;
  children: JSX.Element;
}

const RequiredRole = (props: IRequiredRoleProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!props.role) {
    return props.children;
  }

  if (user.privileges.includes(props.role)) {
    return props.children;
  } else {
    return null;
  }
};

export default RequiredRole;
