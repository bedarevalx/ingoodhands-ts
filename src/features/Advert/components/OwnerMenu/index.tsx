import React, { useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { IAdvertOnwer, IReview } from '../../../../interfaces/ads.interfaces';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { IconButton, Rating } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LoadedButton from '../../../../UI/LoadedButton';
import { getContacts } from '../../../../api/in-good-hands.api';
import Button from '../../../../UI/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { ReviewsModal } from '../..';
import { useAppSelector } from '../../../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';

interface IOwnerMenuProps {
  classNames?: string[];
  user: IAdvertOnwer | null;
  viewCount: number | null;
  adId: number | null;
  phoneNumber?: string;
  onGetContact: () => void;
  getReviews: () => void;
  isLoading: boolean;
  isOwner: boolean;
  isReviewsLoading: boolean;
  reviews: IReview[];
  reviewsPage: number;
  setReviewsLoading: (isLoading: boolean) => void;
  isHaveMoreReviews: boolean;
}

export const OwnerMenu = (props: IOwnerMenuProps) => {
  const [isReviewsOpened, setIsReviewsOpened] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleGetPhoneNumber = async () => {
    if (!auth.isAuthenticate) {
      navigate('/sign-in');
    }
    if (!!props.adId) {
      props.onGetContact();
    }
  };

  const handleReviewsOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsReviewsOpened(true);
  };

  const handleReviewsClose = () => {
    setIsReviewsOpened(false);
  };

  const handleEditClick = () => {
    navigate('/edit/' + props.adId);
  };

  return (
    <div className={classNamesParser('owner-menu', props.classNames)}>
      <div className='owner-menu__header'>
        <AccountCircleRoundedIcon className='owner-menu__user-icon' />
        <div className=''>
          <h3 className='owner-menu__user-name'>{props.user?.name}</h3>
          <p className='owner-menu__created-at'>
            дата регистрации: {props.user?.createdAt}
          </p>
        </div>
      </div>
      <div className='owner-menu__rating-wrapper'>
        <Rating
          className='owner-menu__rating'
          value={props.user?.rating}
          precision={0.1}
          readOnly
        />
        <div className='owner-menu__rating-value'>
          <h4>Рейтинг: {props.user?.rating.toFixed(1)}</h4>
        </div>
        <a
          href='#'
          className='owner-menu__reviews-link'
          onClick={handleReviewsOpen}>
          Все отзывы
        </a>
      </div>
      <div className='owner-menu__view-count'>
        <RemoveRedEyeOutlinedIcon className='owner-menu__view-icon' />
        <span className='owner-menu__view-count-value'>{props.viewCount}</span>
      </div>
      {props.isOwner ? (
        <Button
          classNames={['owner-menu__get-contacts']}
          onClick={handleEditClick}>
          Редактировать объявление
        </Button>
      ) : !!props.phoneNumber ? (
        <>
          <div className='owner-menu__phone-number-wrapper'>
            <a
              href={`tel:${props.phoneNumber}`}
              className='owner-menu__phone-number'>
              <p>{props.phoneNumber}</p>
            </a>
          </div>
          <Button classNames={['owner-menu__reserve']}>
            <CalendarMonthIcon />
            Забронировать
          </Button>
        </>
      ) : (
        <div className='owner-menu__get-contact-wrapper'>
          <LoadedButton
            variant={'text'}
            isLoading={false}
            onClick={handleGetPhoneNumber}
            classNames={['owner-menu__get-contacts']}
            label='Получить контакты'
          />
        </div>
      )}
      <ReviewsModal
        reviews={props.reviews}
        open={isReviewsOpened}
        fetchReviews={props.getReviews}
        page={props.reviewsPage}
        isLastPage={props.isHaveMoreReviews}
        setIsLoading={props.setReviewsLoading}
        handleClose={handleReviewsClose}
        isReviewsLoading={props.isReviewsLoading}
      />
    </div>
  );
};
