import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import { ProfileController } from '../../controllers/profile.controller';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { ReviewItem } from '../../../Advert';

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
  const isNoReviews =
    !reviews.isLoading && reviews.reviews.length === 0 && reviews.page;

  return (
    <div className={classNamesParser('reviews-list', props.classNames)}>
      <h3>Мои отзывы</h3>
      {reviews.isLoading && <Spinner />}
      {isNoReviews && <p>У вас нет ни одного отзыва</p>}
      {!reviews.isLoading &&
        reviews.reviews.map((review) => (
          <ReviewItem
            key={review.id}
            writtenBy={review.writenBy}
            score={review.score}
            text={review.text}
            createdAt={review.createdAt}
          />
        ))}

      <Pagination className='reviews-list__pagination' />
    </div>
  );
};
