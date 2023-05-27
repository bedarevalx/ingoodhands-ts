import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import { ProfileController } from '../../controllers/profile.controller';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { ReviewItem } from '../../../Advert';
import NotFoundItems from '../../../../components/NotFoundItems';

interface IReviewsListProps {
  classNames?: string[];
}

export const ReviewsList = (props: IReviewsListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reviews = useAppSelector((state) => state.reviews);
  const controller = new ProfileController(dispatch, navigate);
  useEffect(() => {
    controller.getMyReviews();
  }, []);

  return (
    <div className={classNamesParser('reviews-list', props.classNames)}>
      <h3>Мои отзывы</h3>
      {reviews.isLoading && <Spinner />}
      {!reviews.isLoading && reviews.reviews.length === 0 && (
        <NotFoundItems
          classNames={['reservations-list__list']}
          icon='😔'
          text={`У вас еще нет отзывов`}
        />
      )}

      <div className='reviews-list__list'>
        {!reviews.isLoading &&
          reviews.reviews.map((review) => (
            <ReviewItem
              key={review.id}
              writtenBy={review.writenBy}
              score={review.score}
              text={review.text}
              createdAt={review.createdAt}
              classNames={['reviews-list__item']}
            />
          ))}

        <Pagination
          className='reviews-list__pagination'
          count={reviews.totalPages}
          page={reviews.page}
          onChange={controller.handleReviewsPageChange}
        />
      </div>
    </div>
  );
};
