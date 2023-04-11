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

    return () => {
      myAdsController.clearValues();
    };
  }, []);

  return (
    <div className={classNamesParser('my-ads-list', props.classNames)}>
      <h3 className='my-ads-list__title'>Мои объявления</h3>
      <div className='my-ads-list__list'>
        {myAds.isLoading && <Spinner />}
        {!myAds.isLoading && myAds.ads.length === 0 ? (
          <p>У вас нет созданных объявлений</p>
        ) : null}
        {!myAds.isLoading &&
          myAds.ads.map((ad) => (
            <UserAd
              key={ad.id}
              id={ad.id}
              title={ad.title}
              description={ad.description}
              viewCount={ad.viewCount}
              likeCount={ad.likeCount}
              imagePath={ad.imagePath}
              placeName={ad.address}
              state={ad.status}
              variant={'my-ads'}
              isFavorited={false}
            />
          ))}
        <div className='my-ads-list__pagination-wrapper'>
          <Pagination
            page={myAds.page}
            count={myAds.totalPages}
            onChange={myAdsController.handlePageChange}
            className='my-ads-list__pagination'
          />
        </div>
      </div>
    </div>
  );
};
