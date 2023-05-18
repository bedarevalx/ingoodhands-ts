import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';
import { DealsList } from '../../features/Profile';

const DealsPage = () => {
  return (
    <HeaderLayout classNames={['deals-page__container']} menuType='profile'>
      <div className='deals-page__wrapper'>
        <SideMenu
          currentMenu='profile/deals'
          classNames={['deals-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
        <DealsList />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(DealsPage);
