import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { MyAdsList } from '../../features/Profile';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const MyAdsPage = () => {
  return (
    <HeaderLayout classNames={['my-ads-page__container']}>
      <div className='my-ads-page__wrapper'>
        <SideMenu
          currentMenu='profile/my-ads'
          classNames={['my-ads-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
        <MyAdsList classNames={['my-ads-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(MyAdsPage);
