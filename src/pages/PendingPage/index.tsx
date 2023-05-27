import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import { PendingList } from '../../features/Admin';

const PendingPage = () => {
  return (
    <HeaderLayout
      classNames={['pending-page__container']}
      menuType='admin-panel'>
      <div className='pending-page__wrapper'>
        <SideMenu
          currentMenu='admin'
          classNames={['pending-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        <PendingList />
        {/* <AdminInfo classNames={['profile-page__profile-info']} /> */}
      </div>
    </HeaderLayout>
  );
};

export default React.memo(PendingPage);
