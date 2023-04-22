import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';

const PendingPage = () => {
  return (
    <HeaderLayout classNames={['pending-page__container']}>
      <div className='pending-page__wrapper'>
        <SideMenu
          currentMenu='admin/pending'
          classNames={['pending-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        {/* <AdminInfo classNames={['profile-page__profile-info']} /> */}
      </div>
    </HeaderLayout>
  );
};

export default React.memo(PendingPage);
