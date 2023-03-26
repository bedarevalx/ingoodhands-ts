import React from 'react';
import { useAppSelector } from '../../../../hooks/useRedux';

const PasswordIndicator = () => {
  const signUp = useAppSelector((state) => state.signUp);

  const getPasswordStrength = () => {
    if (signUp.passwordStrength === 0) return 'password-indicator__weak';
    if (signUp.passwordStrength === 1) return 'password-indicator__normal';
    if (signUp.passwordStrength === 2) return 'password-indicator__strong';
    return '';
  };
  return <div className={`password-indicator ${getPasswordStrength()}`} />;
};

export default PasswordIndicator;
