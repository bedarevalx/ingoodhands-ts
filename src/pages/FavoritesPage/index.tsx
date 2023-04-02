import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';

const FavoritesPage = () => {
  return (
    <HeaderLayout classNames={['favorites-page__container']}>
      <SideMenu currentMenu='profile/favorites' />
    </HeaderLayout>
  );
};

export default React.memo(FavoritesPage);
