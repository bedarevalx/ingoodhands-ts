import { Pagination, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { DealsFilters } from '../../../../mocks/deals-filters.mocks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { MakeReviewModal, ReservationController, ReservationItem } from '../..';
import Spinner from '../../../../UI/Spinner';
import NotFoundItems from '../../../../components/NotFoundItems';

export const DealsList = () => {
  const dispatch = useAppDispatch();
  const controller = new ReservationController(dispatch);
  const deals = useAppSelector((state) => state.deals);

  useEffect(() => {
    controller.getDeals();

    return () => {
      controller.clearDealsValues();
    };
  }, []);

  const getNotFoundParamTitle = () => {
    const params = JSON.parse(deals.param) as string[];
    if (params.length > 1) {
      return 'активных';
    }
    if (params[0] === 'completed') {
      return 'завершенных';
    } else {
      return 'просроченных';
    }
  };
  return (
    <div className='deals-list'>
      <div className='deals-list__header'>
        <h3 className='deals-list__title'>Сделки</h3>
      </div>
      <ToggleButtonGroup
        value={deals.param}
        exclusive
        onChange={controller.handleDealsParamChange}
        className='deals-list__filters'>
        {DealsFilters.map((filter) => (
          <ToggleButton
            key={filter.value.toString()}
            className='deals-list__filter-btn'
            value={JSON.stringify(filter.value)}>
            {filter.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <div className='deals-list__list'>
        {deals.isLoading && <Spinner classNames={['deals-list__spinner']} />}
        {!deals.isLoading && deals.deals.length === 0 && (
          <NotFoundItems
            classNames={['deals-list__not-found']}
            icon='😔'
            text={`У вас еще нет ${getNotFoundParamTitle()} сделок`}
          />
        )}

        {deals.deals.map((deal) => (
          <ReservationItem
            key={deal.id}
            title={deal.post.title}
            userName={deal.post.user.name}
            adCreatedDate={deal.post.date}
            description={deal.post.description}
            image={deal.post.imagePath}
            date={deal.createdAt}
            id={deal.id}
            expiredAt={deal.expiredAt}
            phoneNumber={deal.contacts?.phone}
            variant={deal.status}
            postId={deal.post.id}
            onConfirmDeal={controller.handleConfirmDeal}
            onCreateReview={controller.onReviewModalOpen}
            address={deal.post.address}
            score={deal.score}
          />
        ))}
      </div>
      <div className='reservations-list__pagination-wrapper'>
        <Pagination
          count={deals.totalPages}
          page={deals.page}
          onChange={controller.handleDealsPageChange}
        />
      </div>
      <MakeReviewModal
        open={deals.isReviewModalOpened}
        isLoading={deals.isReviewLodaing}
        handleClose={controller.onReviewModalClose}
        handleCreateReview={controller.onCreateReview}
      />
    </div>
  );
};
