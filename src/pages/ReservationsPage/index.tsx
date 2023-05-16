import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const ReservationsPage = () => {
  return (
    <HeaderLayout
      classNames={['reservations-page__container']}
      menuType='profile'>
      <div className='reservations-page__wrapper'>
        <SideMenu
          currentMenu='profile/reservations'
          classNames={['reservations-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(ReservationsPage);
