import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { HistoryController } from '../../controllers/history.controller';
import { AdSearchItem } from '../AdSearchItem';
import NotFoundItems from '../../../../components/NotFoundItems';
import Spinner from '../../../../UI/Spinner';
import { Pagination } from '@mui/material';

interface IAdminPanelProps {
  classNames?: string[];
}

export const HistoryList = (props: IAdminPanelProps) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history);
  const navigate = useNavigate();
  const controller = new HistoryController(dispatch);

  useEffect(() => {
    controller.getHistoryAds();
  }, []);

  return (
    <div className='history-list'>
      <h3 className='history-list__title'>История проверок</h3>
      <div className='history-list__list'>
        {history.isLoading ? (
          <Spinner classNames={['history-list__spinner']} />
        ) : null}
        {!history.isLoading &&
          history.ads.length === 0 &&
          history.page === 1 && (
            <NotFoundItems icon='😄' text={`История проверок пуста`} />
          )}

        {history.ads.map((ad) => {
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
              variant={'history'}
              isPublished={ad.isPublished}
              resultText={ad.resultText}
              moderatorEmail={ad.moderatorEmail}
              onUnpublish={controller.onSendToModeration}
            />
          );
        })}
      </div>
      <Pagination
        className='pending-list__pagination'
        count={history.totalPages}
        page={history.page}
        onChange={controller.onChangePage}
      />
    </div>
  );
};
