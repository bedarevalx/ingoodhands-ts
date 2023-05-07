import React, { useEffect } from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import { Advert } from '../../features/Advert';

const AdvertPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HeaderLayout classNames={['advert-page__container']} menuType='profile'>
      <Advert />
    </HeaderLayout>
  );
};

export default React.memo(AdvertPage);
