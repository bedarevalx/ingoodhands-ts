import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdPreviewList } from '../../features/AdvertList';
import { AdsController } from '../../features/AdvertList/controllers/ads.controller';
import { useAppDispatch } from '../../hooks/useRedux';
import HeaderLayout from '../../layouts/HeaderLayout';
import FiltersHeader from '../../components/FiltersHeader';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const controller = new AdsController(dispatch);

  // useEffect(() => {
  //   controller.fetchAds();
  // }, []);

  return (
    <HeaderLayout
      classNames={['home-page__container']}
      menuType='profile'
      subHeader={<FiltersHeader />}>
      <AdPreviewList />
    </HeaderLayout>
  );
};

export default React.memo(HomePage);
