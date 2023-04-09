import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Pagination } from '@mui/material';
import { MyAdsController } from '../../controllers/my-ads.controller';
import UserAd from '../UserAd';
import Spinner from '../../../../UI/Spinner';

interface IMyAdsListProps {
  classNames?: string[];
}

export const MyAdsList = (props: IMyAdsListProps) => {
  const dispatch = useAppDispatch();
  const myAds = useAppSelector((state) => state.myAds);
  const myAdsController = new MyAdsController(dispatch);
  useEffect(() => {
    myAdsController.getMyAds();
  }, []);

  return (
    <div className={classNamesParser('my-ads-list', props.classNames)}>
      <h3>Мои объявления (КТО СКАЖЕТ, ЧТО ДИЗАЙН ГАВНО, ТОТ ЛОХ!!)</h3>
      {myAds.isLoading && <Spinner />}
      {myAds.ads.map((ad) => (
        <UserAd
          key={ad.id}
          id={ad.id}
          title={ad.title}
          description={ad.description}
          viewCount={ad.viewCount}
          likeCount={ad.likeCount}
          imagePath={ad.imagePath}
        />
      ))}
      <Pagination page={myAds.page} count={myAds.totalPages} />
    </div>
  );
};
