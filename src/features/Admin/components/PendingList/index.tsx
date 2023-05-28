import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import { AdSearchItem } from '../AdSearchItem';
import { useNavigate } from 'react-router-dom';
import { getPendingAds } from '../../../../api/in-good-hands.api';
import { AdsController } from '../../controllers/ads.controller';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material';
import NotFoundItems from '../../../../components/NotFoundItems';
import { PendingFilters } from '../../../../mocks/pending-list-filters.mocks';

interface IPendingListProps {
  classNames?: string[];
}
export const PendingList = (props: IPendingListProps) => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.adminAds);
  const navigate = useNavigate();
  const controller = new AdsController(dispatch);

  useEffect(() => {
    controller.getAds();

    return () => {
      controller.clearState();
    };
  }, []);

  const getNotFoundParamTitlte = () =>
    pending.param === 'pending'
      ? 'ожиидающих проверки'
      : 'находящихся на проверке';

  return (
    <div className={classNamesParser('pending-list', props.classNames)}>
      <h3 className='pending-list__title'>Ожидают проверки</h3>
      <ToggleButtonGroup
        value={pending.param}
        exclusive
        onChange={controller.onParamChange}
        className='pending-list__filters'>
        {PendingFilters.map((filter) => (
          <ToggleButton
            key={filter.value}
            className='pending-list__filter-btn'
            value={filter.value}>
            {filter.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className='pending-list__list'>
        {pending.isLoading ? (
          <Spinner classNames={['pending-list__spinner']} />
        ) : null}
        {!pending.isLoading &&
          pending.ads.length === 0 &&
          pending.page === 1 && (
            <NotFoundItems
              icon='😄'
              text={`Нет объявлений ${getNotFoundParamTitlte()}`}
            />
          )}

        {pending.ads.map((ad) => {
          const handleClick = () => {
            navigate('/admin/moderation/' + ad.id);
          };
          return (
            <AdSearchItem
              key={ad.id}
              title={ad.title}
              description={ad.descripton}
              createdAt={ad.date}
              imagePath={ad.imagePath}
              id={ad.id}
              handleClick={handleClick}
              variant={pending.param}
              moderatorEmail={ad.moderatorEmail}
              idReview={ad.idChecking}
              onCancelModeration={controller.onCancelModeration}
            />
          );
        })}
      </div>
      <Pagination
        className='pending-list__pagination'
        count={pending.totalPages}
        page={pending.page}
        onChange={controller.onChangePage}
      />
    </div>
  );
};
