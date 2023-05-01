import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import { ModerationForm } from '../../features/Admin';

const ModerationPage = () => {
  return (
    <HeaderLayout menuType='admin-panel'>
      <ModerationForm />
    </HeaderLayout>
  );
};

export default React.memo(ModerationPage);
