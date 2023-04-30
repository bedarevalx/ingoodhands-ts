import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';

const AdminPage = () => {
  return (
    <HeaderLayout
      classNames={['profile-page__container']}
      menuType='admin-panel'>
      <div className='profile-page__wrapper'>
        <SideMenu
          currentMenu='admin'
          classNames={['profile-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        {/* <AdminInfo classNames={['profile-page__profile-info']} /> */}
      </div>
    </HeaderLayout>
  );
};

export default React.memo(AdminPage);
