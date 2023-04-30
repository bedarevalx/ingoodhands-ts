import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { IAdvertOnwer } from '../../../../interfaces/ads.interfaces';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import moment from 'moment';
import { Rating } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LoadedButton from '../../../../UI/LoadedButton';
import { getContacts } from '../../../../api/in-good-hands.api';

interface IOwnerMenuProps {
  classNames?: string[];
  user: IAdvertOnwer | null;
  viewCount: number | null;
  adId: number | null;
  phoneNumber?: string;
  onGetContact: () => void;
}

export const OwnerMenu = (props: IOwnerMenuProps) => {
  const handleGetPhoneNumber = async () => {
    if (!!props.adId) {
      props.onGetContact();
    }
  };
  return (
    <div className={classNamesParser('owner-menu', props.classNames)}>
      <div className='owner-menu__header'>
        <AccountCircleRoundedIcon className='owner-menu__user-icon' />
        <div className=''>
          <h3 className='owner-menu__user-name'>{props.user?.name}</h3>
          <p className='owner-menu__created-at'>
            дата регистрации:{' '}
            {moment(props.user?.createdAt).format('MMMM YYYY')}
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
        <a href='#' className='owner-menu__reviews-link'>
          Все отзывы
        </a>
      </div>
      <div className='owner-menu__view-count'>
        <RemoveRedEyeOutlinedIcon className='owner-menu__view-icon' />
        <span className='owner-menu__view-count-value'>{props.viewCount}</span>
      </div>
      {!!props.phoneNumber ? (
        <a href={`tel:${props.phoneNumber}`}>{props.phoneNumber}</a>
      ) : (
        <LoadedButton
          variant={'text'}
          isLoading={false}
          onClick={handleGetPhoneNumber}
          classNames={['owner-menu__get-contacts']}
          label='Получить контакты'
        />
      )}
    </div>
  );
};
