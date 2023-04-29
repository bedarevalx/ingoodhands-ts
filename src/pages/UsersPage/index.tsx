import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import { UserSearchForm } from '../../features/Admin';

const UsersPage = () => {
  return (
    <HeaderLayout classNames={['users-page__container']}>
      <div className='users-page__wrapper'>
        <SideMenu
          currentMenu='admin/users'
          classNames={['users-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        <UserSearchForm />
        {/* <AdminInfo classNames={['profile-page__profile-info']} /> */}
      </div>
    </HeaderLayout>
  );
};

export default React.memo(UsersPage);
