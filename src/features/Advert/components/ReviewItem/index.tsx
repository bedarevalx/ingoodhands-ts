import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
interface IReviewItemProps {
  classNames?: string[];
}

export const ReviewItem = (props: IReviewItemProps) => {
  return (
    <div className={classNamesParser('review-item', props.classNames)}>
      <div className='review-item__user-info'>
        <div className='review-item__image-wrapper'>
          <AccountCircleIcon className='review-item__image' />
        </div>
        <div className='review-item__user'>
          <p className='review-item__username'>Алексей</p>
          <div className='review-item__rating-value'>
            <StarIcon className='review-item__star-icon' />
            <span className='review-item__rating'>5</span>
          </div>
        </div>
      </div>
      <div className='review-item__review-wrapper'>
        <p className='review-item__review'>
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и
          вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
          латинице с начала XVI века.
        </p>
      </div>
    </div>
  );
};
