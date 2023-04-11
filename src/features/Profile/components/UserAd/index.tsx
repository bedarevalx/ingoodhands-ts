import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdsStatusTypes } from '../../../../types/general.types';
import { ICategory } from '../../../../interfaces/general.interfaces';
import { IconButton } from '@mui/material';

interface IUserAdProps {
  classNames?: string[];
  title?: string;
  description?: string;
  viewCount?: number;
  favoriteCount?: number;
  imagePath?: string;
  likeCount?: number;
  id: number;
  placeName?: string;
  state?: AdsStatusTypes;
  variant: 'favorites' | 'my-ads';
  date?: string;
  category?: ICategory;
  city?: string;
  isFavorited: boolean;

  handleFavoriteClick?: (id: number, isFavorited: boolean) => void;
}

const UserAd = (props: IUserAdProps) => {
  const handleFavoriteClick = () => {
    props.handleFavoriteClick &&
      props.handleFavoriteClick(props.id, props?.isFavorited);
  };
  return (
    <div className='user-ad'>
      <div className='user-ad__image-wrapper'>
        <img className='user-ad__image' src={props.imagePath} alt='' />
      </div>
      <div className='user-ad__info'>
        <h4 className='user-ad__title'>{props.title}</h4>
        <p className='user-ad__description'>
          {!!props.description?.length ? props.description : 'Без описания'}
        </p>
        <p className='user-ad__address'>
          {props.variant === 'my-ads' ? props.placeName : props.city}
        </p>
        {props.variant === 'my-ads' ? (
          <div className='user-ad__statistic-wrapper'>
            <>
              <div className='user-ad__view-count'>
                <RemoveRedEyeIcon className='user-ad__view-icon' />
                <span className='user-ad__statistic-value'>
                  {props.viewCount}
                </span>
              </div>
              <div className='user-ad__like-count'>
                <FavoriteIcon className='user-ad__like-icon' />
                <span className='user-ad__statistic-value'>
                  {props.likeCount}
                </span>
              </div>
              <div className='user-ad__state'>
                <span>{props.state}</span>
              </div>
            </>
          </div>
        ) : (
          <div className='user-ad__category-wrapper'>
            <span className='user-ad__category'>
              {props.category?.title} {props.category?.icon}
            </span>
          </div>
        )}

        {props.variant === 'favorites' ? (
          <IconButton
            className='user-ad__favorite-btn'
            onClick={handleFavoriteClick}>
            <FavoriteIcon
              className={`user-ad__favorite-icon ${
                props.isFavorited ? 'user-ad__favorited' : ''
              }`}
            />
          </IconButton>
        ) : null}
        <p className='user-ad__date'>{props.date}</p>
      </div>
    </div>
  );
};

export default UserAd;
