import React from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import { Advert } from '../../features/Advert';

const AdvertPage = () => {
  return (
    <HeaderLayout classNames={['advert-page__container']}>
      <Advert />
    </HeaderLayout>
  );
};

export default React.memo(AdvertPage);