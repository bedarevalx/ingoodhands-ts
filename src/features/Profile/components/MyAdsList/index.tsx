import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MyAdsController } from '../../controllers/my-ads.controller';
import UserAd from '../UserAd';
import Spinner from '../../../../UI/Spinner';
import { useNavigate } from 'react-router-dom';
import { MyAdsFilters } from '../../../../mocks/my-ads-filters.mocks';

interface IMyAdsListProps {
  classNames?: string[];
}

export const MyAdsList = (props: IMyAdsListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myAds = useAppSelector((state) => state.myAds);
  const controller = new MyAdsController(dispatch);
  useEffect(() => {
    controller.getMyAds();

    return () => {
      controller.clearValues();
    };
  }, []);

  const handleEdit = (id: number) => {
    navigate('/edit/' + id);
  };

  const handleDelete = (id: number) => {
    controller.handleDeletePost(id);
  };

  const isNoAds = !myAds.isLoading && myAds.ads.length === 0 && myAds.page;

  return (
    <div className={classNamesParser('my-ads-list', props.classNames)}>
      <h3 className='my-ads-list__title'>Мои объявления</h3>
      <ToggleButtonGroup
        value={myAds.param}
        exclusive
        onChange={controller.handleParamChange}
        className='my-ads-list__filters'>
        {MyAdsFilters.map((filter) => (
          <ToggleButton
            key={filter.value}
            className='my-ads-list__filter-btn'
            value={filter.value}>
            {filter.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className='my-ads-list__list'>
        {myAds.isLoading && <Spinner />}
        {isNoAds ? <p>У вас нет созданных объявлений</p> : null}
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
              onDelete={handleDelete}
              reservation={ad.reservation}
              onEdit={handleEdit}
              onConfirmDeal={controller.handleConfirmDeal}
            />
          ))}
        <div className='my-ads-list__pagination-wrapper'>
          <Pagination
            page={myAds.page}
            count={myAds.totalPages}
            onChange={controller.handlePageChange}
            className='my-ads-list__pagination'
          />
        </div>
      </div>
    </div>
  );
};
