import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';
import { ReviewsList } from '../../features/Profile';

const ReviewsPage = () => {
  return (
    <HeaderLayout classNames={['reviews-page__container']} menuType='profile'>
      <div className='reviews-page__wrapper'>
        <SideMenu
          classNames={['reviews-page__side-menu']}
          currentMenu='profile/reviews'
          menuItems={ProfileMenuMocks}
        />
        <ReviewsList classNames={['reviews-page__list']} />
      </div>
    </HeaderLayout>
  );
};

export default React.memo(ReviewsPage);
