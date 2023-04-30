import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import { CategoriesList } from '../../features/Admin';

const CategoriesPage = () => {
  return (
    <HeaderLayout
      classNames={['categories-page__container']}
      menuType='admin-panel'>
      <div className='categories-page__wrapper'>
        <SideMenu
          currentMenu='admin/categories'
          classNames={['categories-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        <CategoriesList classNames={['categories-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(CategoriesPage);
