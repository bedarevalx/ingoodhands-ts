import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MyAdsController } from '../../controllers/my-ads.controller';
import UserAd from '../UserAd';
import Spinner from '../../../../UI/Spinner';
import { useNavigate } from 'react-router-dom';
import { MyAdsFilters } from '../../../../mocks/my-ads-filters.mocks';
import NotFoundItems from '../../../../components/NotFoundItems';

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

  const getNotFoundParamTitle = () => {
    const params = JSON.parse(myAds.param) as string[];
    if (params.length === 0) return 'Вы еще не создали объявления';
    if (params.length === 3)
      return 'У вас нет объявлений, ожидающих публикации';
    if (params[0] === 'active') return 'У вас нет активных объявлений';
    if (params[0] === 'closed') return 'У вас нет завершенных объявлений';
    else return 'У вас нет забронированных объявлений';
  };

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
            key={JSON.stringify(filter.value)}
            className='my-ads-list__filter-btn'
            value={JSON.stringify(filter.value)}>
            {filter.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className='my-ads-list__list'>
        {myAds.isLoading && <Spinner classNames={['my-ads-list__spinner']} />}
        {isNoAds ? (
          <NotFoundItems icon='😔' text={getNotFoundParamTitle()} />
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
              onDelete={handleDelete}
              reservation={ad.reservation}
              onEdit={handleEdit}
              onConfirmDeal={controller.handleConfirmDeal}
            />
          ))}
      </div>
      <div className='my-ads-list__pagination-wrapper'>
        <Pagination
          page={myAds.page}
          count={myAds.totalPages}
          onChange={controller.handlePageChange}
          className='my-ads-list__pagination'
        />
      </div>
    </div>
  );
};
