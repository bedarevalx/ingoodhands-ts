import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const DealsPage = () => {
  return (
    <HeaderLayout classNames={['deals-page__container']} menuType='profile'>
      <div className='deals-page__wrapper'>
        <SideMenu
          currentMenu='profile/deals'
          classNames={['deals-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(DealsPage);
