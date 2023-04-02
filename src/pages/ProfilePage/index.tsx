import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';

const ProfilePage = () => {
  return (
    <HeaderLayout classNames={['profile-page__container']}>
      <SideMenu currentMenu='profile' />
    </HeaderLayout>
  );
};

export default React.memo(ProfilePage);
