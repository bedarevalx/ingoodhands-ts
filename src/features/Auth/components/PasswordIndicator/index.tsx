import React from 'react';
import { useAppSelector } from '../../../../hooks/useRedux';

interface IPasswordIndicatorProps {
  passwordStrength: number | null;
}

const PasswordIndicator = (props: IPasswordIndicatorProps) => {
  const getPasswordStrength = () => {
    if (props.passwordStrength === 0) return 'password-indicator__weak';
    if (props.passwordStrength === 1) return 'password-indicator__normal';
    if (props.passwordStrength === 2) return 'password-indicator__strong';
    return '';
  };
  return <div className={`password-indicator ${getPasswordStrength()}`} />;
};

export default PasswordIndicator;
