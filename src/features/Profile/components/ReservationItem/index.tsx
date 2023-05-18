import { IconButton } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  DealsSearchParamTypes,
  ReservationSearchParamTypes,
} from '../../../../types/ads.types';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Map } from '@mui/icons-material';
interface IReservationItemProps {
  id: number;
  postId: number;
  userName: string;
  title: string;
  image: string;
  description: string;
  date: string;
  adCreatedDate: string;
  variant: ReservationSearchParamTypes | DealsSearchParamTypes;
  expiredAt?: string;
  address: string;
  days?: number;
}
export const ReservationItem = (props: IReservationItemProps) => {
  return (
    <div className='reservation-item'>
      <div className='reservation-item__header'>
        {(props.variant === 'confirm_sent' || props.variant === 'order') && (
          <>
            Заберите у{' '}
            <span className='reservation-item__username'>{props.userName}</span>{' '}
            до <span className='reservation-item__days'>{props.expiredAt}</span>
          </>
        )}

        {props.variant === 'outcoming' && (
          <>
            <span className='reservation-item__username'>{props.userName}</span>{' '}
            еще не принял ваше бронирование на{' '}
            <span className='reservation-item__days'>{props.days}</span> дня
          </>
        )}
        {props.variant === 'incoming' && (
          <>
            <span className='reservation-item__username'>{props.userName}</span>{' '}
            хочет забронировать ваше объявление на{' '}
            <span className='reservation-item__days'>{props.days}</span> дня
          </>
        )}
      </div>
      <div className='reservation-item__ad-preview'>
        <Link
          to={`/post/${props.postId}`}
          target='_blank'
          className='reservation-item__ad'
          style={{ color: 'black', textDecoration: 'none' }}>
          <div className='reservation-item__img-wrapper'>
            <img src={props.image} alt='' className='reservation-item__img' />
          </div>
          <div className='reservation-item__ad-info'>
            <h3 className='reservation-item__title'>{props.title}</h3>
            <h3 className='reservation-item__description'>
              {props.description}
            </h3>
            <p className='reservation-item__address'>{props.address}</p>
            <p className='reservation-item__ad-date'>{props.adCreatedDate}</p>
          </div>
        </Link>

        <div className='reservation-item__buttons'>
          {props.variant === 'incoming' && (
            <>
              <IconButton className='reservation-item__button'>
                <CheckIcon className='reservation-item__confirm' />
              </IconButton>
              <IconButton className='reservation-item__button'>
                <CloseIcon className='reservation-item__decline' />
              </IconButton>
            </>
          )}

          {props.variant === 'confirm_sent' && (
            <>
              <IconButton className='reservation-item__button'>
                <CheckIcon className='reservation-item__confirm' />
              </IconButton>
              <IconButton className='reservation-item__button'>
                <LocalPhoneIcon className='reservation-item__confirm' />
              </IconButton>
            </>
          )}

          {props.variant === 'order' && (
            <>
              <IconButton className='reservation-item__button'>
                <CheckIcon className='reservation-item__confirm' />
              </IconButton>
              <IconButton className='reservation-item__button'>
                <Map className='reservation-item__confirm' />
              </IconButton>
            </>
          )}
        </div>
      </div>
      <p className='reservation-item__date'>{props.date} </p>
    </div>
  );
};
