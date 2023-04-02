import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';

const MyAdsPage = () => {
  return (
    <HeaderLayout classNames={['my-ads-page__container']}>
      <SideMenu currentMenu='profile/my-ads' />
    </HeaderLayout>
  );
};

export default React.memo(MyAdsPage);
