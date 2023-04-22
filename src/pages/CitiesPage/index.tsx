import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import { CitiesList } from '../../features/Admin';

const CitiesPage = () => {
  return (
    <HeaderLayout classNames={['cities-page__container']}>
      <div className='cities-page__wrapper'>
        <SideMenu
          currentMenu='admin/cities'
          classNames={['cities-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        <CitiesList classNames={['cities-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(CitiesPage);
