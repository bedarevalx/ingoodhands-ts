import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { FavoritesList } from '../../features/Profile';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const FavoritesPage = () => {
  return (
    <HeaderLayout classNames={['favorites-page__container']} menuType='profile'>
      <div className='favorites-page__wrapper'>
        <SideMenu
          currentMenu='profile/favorites'
          classNames={['favorites-page__side-menu']}
          menuItems={ProfileMenuMocks}
        />
        <FavoritesList classNames={['favorites-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(FavoritesPage);
