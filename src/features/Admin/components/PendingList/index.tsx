import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import { AdSearchItem } from '../AdSearchItem';
import { useNavigate } from 'react-router-dom';
import { getPendingAds } from '../../../../api/in-good-hands.api';
import { AdsController } from '../../controllers/ads.controller';
import { Pagination } from '@mui/material';

interface IPendingListProps {
  classNames?: string[];
}
export const PendingList = (props: IPendingListProps) => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.adminAds);
  const navigate = useNavigate();
  const controller = new AdsController(dispatch);

  useEffect(() => {
    controller.getPendingAds();

    return () => {
      controller.clearState();
    };
  }, []);

  return (
    <div className={classNamesParser('pending-list', props.classNames)}>
      <h3 className='pending-list__title'>Ожидают проверки</h3>
      <div className='pending-list__list'>
        {pending.isLoading ? <Spinner /> : null}
        {pending.ads.map((ad) => {
          const handleClick = () => {
            navigate('/admin/moderation/' + ad.id);
          };
          return (
            <AdSearchItem
              title={ad.title}
              description={ad.descripton}
              createdAt={ad.date}
              imagePath={ad.imagePath}
              id={ad.id}
              handleClick={handleClick}
              variant='pending'
            />
          );
        })}
      </div>
      <Pagination
        className='pending-list__pagination'
        count={pending.totalPages}
        page={pending.page}
      />
    </div>
  );
};
