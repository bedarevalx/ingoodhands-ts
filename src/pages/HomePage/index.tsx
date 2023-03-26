import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';

const HomePage = () => {
  return (
    <HeaderLayout classNames={['home-page__container']}>HomePage</HeaderLayout>
  );
};

export default React.memo(HomePage);
