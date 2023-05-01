import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
interface IReviewItemProps {
  classNames?: string[];
  writtenBy: string;
  score: number;
  text: string;
  createdAt: string;
}

export const ReviewItem = (props: IReviewItemProps) => {
  return (
    <div className={classNamesParser('review-item', props.classNames)}>
      <div className='review-item__user-info'>
        <div className='review-item__image-wrapper'>
          <AccountCircleIcon className='review-item__image' />
        </div>
        <div className='review-item__user'>
          <p className='review-item__username'>{props.writtenBy}</p>
          <div className='review-item__rating-value'>
            <StarIcon className='review-item__star-icon' />
            <span className='review-item__rating'>{props.score}</span>
          </div>
          <span className='review-item__date'>
            {moment(props.createdAt).format('DD MMMM YYYY')}
          </span>
        </div>
      </div>
      <div className='review-item__review-wrapper'>
        <p className='review-item__review'>{props.text}</p>
      </div>
    </div>
  );
};
