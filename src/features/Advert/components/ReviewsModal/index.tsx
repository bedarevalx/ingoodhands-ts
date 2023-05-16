import React from 'react';
import Modal from '../../../../UI/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReviewItem } from '../..';
import { IReview } from '../../../../interfaces/ads.interfaces';
import Spinner from '../../../../UI/Spinner';
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll';

interface IReviewsModalProps {
  classNames?: string[];
  children?: JSX.Element | JSX.Element[] | any;
  handleClose?: () => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchReviews: () => void;
  open?: boolean;
  reviews: IReview[];
  page: number;
  isLastPage: boolean;
  isReviewsLoading: boolean;
}

export const ReviewsModal = (props: IReviewsModalProps) => {
  const { loadMoreCallback } = useInfiniteScroll(
    props.fetchReviews,
    props.isReviewsLoading,
    props.setIsLoading,
    props.isLastPage,
    props.reviews,
    props.page,
  );
  return (
    <Modal
      open={props.open}
      handleClose={props.handleClose}
      classNames={['reviews-modal']}>
      <h2 className='reviews-modal__title'>Отзывы </h2>
      <IconButton
        className='reviews-modal__close-btn'
        onClick={props.handleClose}>
        <CloseIcon className='reviews-modal__close-icon' />
      </IconButton>
      <div className='reviews-modal__reviews-list'>
        {!props.isReviewsLoading && props.reviews.length === 0 && (
          <h3 className=''>Отзывов нет</h3>
        )}

        {props.reviews.map((review) => (
          <ReviewItem
            createdAt={review.createdAt}
            writtenBy={review.writenBy}
            text={review.text}
            score={review.score}
          />
        ))}
        {!props.isLastPage && (
          <div
            ref={loadMoreCallback}
            className='reviews-modal__spinner-wrapper'>
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  );
};
