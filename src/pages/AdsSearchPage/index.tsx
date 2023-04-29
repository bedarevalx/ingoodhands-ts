import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import { AdsSearchForm } from '../../features/Admin';

const AdsSearchPage = () => {
  return (
    <HeaderLayout classNames={['ads-search-page__container']}>
      <div className='ads-search-page__wrapper'>
        <SideMenu
          currentMenu='admin/ads-search'
          classNames={['ads-search-page__side-menu']}
          menuItems={AdminMenuMocks}
        />
        <AdsSearchForm classNames={['ads-search-page__search-form']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(AdsSearchPage);
