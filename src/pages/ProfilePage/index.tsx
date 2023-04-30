import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileInfo } from '../../features/Profile';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const ProfilePage = () => {
  return (
    <HeaderLayout classNames={['profile-page__container']} menuType='profile'>
      <div className='profile-page__wrapper'>
        <SideMenu
          currentMenu='profile'
          classNames={['profile-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
        <ProfileInfo classNames={['profile-page__profile-info']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(ProfilePage);
