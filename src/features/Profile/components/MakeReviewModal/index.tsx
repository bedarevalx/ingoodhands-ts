import React, { ChangeEvent, useState } from 'react';
import Modal from '../../../../UI/Modal';
import { IconButton, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadedButton from '../../../../UI/LoadedButton';
import Input from '../../../../UI/Input';

interface IMakeReviewModalProps {
  open: boolean;
  handleClose?: () => void;
  handleCreateReview?: (score: number, text: string) => void;
  isLoading: boolean;
}

export const MakeReviewModal = (props: IMakeReviewModalProps) => {
  const [reviewText, setReviewText] = useState('');
  const [score, setScore] = useState(5);

  const handleCreateReview = () => {
    props.handleCreateReview && props.handleCreateReview(score, reviewText);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value);
  };
  const handleRatingChange = (_: any, value: number | null) => {
    if (!value) return;
    setScore(value);
  };
  return (
    <Modal
      open={props.open}
      handleClose={props.handleClose}
      classNames={['make-review-modal']}>
      <h2 className='make-review-modal__title'>Оставить оценку</h2>
      <IconButton
        className='make-review-modal__close-btn'
        onClick={props.handleClose}>
        <CloseIcon className='make-review-modal__close-icon' />
      </IconButton>
      <div className='make-review-modal__rating-wrapper'>
        <Rating
          max={5}
          onChange={handleRatingChange}
          value={score}
          className='make-review-modal__rating'
          size='large'
        />
      </div>

      <Input
        multiline
        value={reviewText}
        onInput={handleInputChange}
        placeholder='Опишите опыт общения с пользователем, расскажите его плюсы и минусы, если они были'
      />
      <p className='make-review-modal__helper'>
        Ваша оценка будет отображаться при просмотре отзывов пользователя на
        странице объявления
      </p>
      <div className='make-review-modal__review-wrapper'>
        <LoadedButton
          onClick={handleCreateReview}
          classNames={['make-review-modal__review']}
          isLoading={props.isLoading}
          label='Оставить оценку'
        />
      </div>
    </Modal>
  );
};
