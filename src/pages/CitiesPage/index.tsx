import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';

const CitiesPage = () => {
  return (
    <HeaderLayout classNames={['profile-page__container']}>
      <div className='profile-page__wrapper'>
        <SideMenu
          currentMenu='admin/cities'
          classNames={['profile-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        {/* <AdminInfo classNames={['profile-page__profile-info']} /> */}
      </div>
    </HeaderLayout>
  );
};

export default React.memo(CitiesPage);
