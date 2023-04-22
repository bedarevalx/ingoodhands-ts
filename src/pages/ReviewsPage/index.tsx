import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';

const ReviewsPage = () => {
  return (
    <HeaderLayout classNames={['reviews-page__container']}>
      <SideMenu currentMenu='profile/reviews' menuItems={ProfileMenuMocks} />
    </HeaderLayout>
  );
};

export default React.memo(ReviewsPage);
