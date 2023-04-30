import React from 'react';
import Modal from '../../../../UI/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReviewItem } from '../..';

interface IReviewsModalProps {
  classNames?: string[];
  children?: JSX.Element | JSX.Element[] | any;
  handleClose?: () => void;
  open?: boolean;
}

export const ReviewsModal = (props: IReviewsModalProps) => {
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
        {new Array(10).fill(0).map((_: any) => (
          <ReviewItem />
        ))}
      </div>
    </Modal>
  );
};
