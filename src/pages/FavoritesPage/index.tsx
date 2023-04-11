import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { FavoritesList } from '../../features/Profile';

const FavoritesPage = () => {
  return (
    <HeaderLayout classNames={['favorites-page__container']}>
      <div className='favorites-page__wrapper'>
        <SideMenu
          currentMenu='profile/favorites'
          classNames={['favorites-page__side-menu']}
        />
        <FavoritesList classNames={['favorites-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(FavoritesPage);
