import React from 'react';
import LogoLayout from '../../layouts/LogoLayout';
import { RecoverPasswordForm } from '../../features/Auth';

const RecoverPasswordPage = () => {
  return (
    <LogoLayout>
      <RecoverPasswordForm />
    </LogoLayout>
  );
};

export default React.memo(RecoverPasswordPage);
