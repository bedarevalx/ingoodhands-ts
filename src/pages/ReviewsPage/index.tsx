import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import SideMenu from '../../components/SideMenu';

const ReviewsPage = () => {
  return (
    <HeaderLayout classNames={['reviews-page__container']}>
      <SideMenu currentMenu='profile/reviews' />
    </HeaderLayout>
  );
};

export default React.memo(ReviewsPage);
