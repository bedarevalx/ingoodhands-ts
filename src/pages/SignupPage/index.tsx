import React from 'react';
import { SignUpForm } from '../../features/Auth';
import LogoLayout from '../../layouts/LogoLayout';

const SignUpPage = () => {
  return (
    <LogoLayout>
      <SignUpForm />
    </LogoLayout>
  );
};

export default SignUpPage;
