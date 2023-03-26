import React from 'react';
import { SignInForm } from '../../features/Auth';
import LogoLayout from '../../layouts/LogoLayout';

const SignInPage = () => {
  return (
    <LogoLayout>
      <SignInForm />
    </LogoLayout>
  );
};

export default React.memo(SignInPage);
