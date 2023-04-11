import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdsStatusTypes } from '../../../../types/general.types';

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
  state: AdsStatusTypes;
}

const UserAd = (props: IUserAdProps) => {
  return (
    <div className='user-ad'>
      <div className='user-ad__image-wrapper'>
        <img className='user-ad__image' src={props.imagePath} alt='' />
      </div>
      <div className='user-ad__info'>
        <h4 className='user-ad__title'>{props.title}</h4>
        <p className='user-ad__description'>
          {!!props.description ? props.description : 'Без описания'}
        </p>
        <p className='user-ad__address'>{props.placeName}</p>
        <div className='user-ad__statistic-wrapper'>
          <div className='user-ad__view-count'>
            <RemoveRedEyeIcon className='user-ad__view-icon' />
            <span className='user-ad__statistic-value'>{props.viewCount}</span>
          </div>
          <div className='user-ad__like-count'>
            <FavoriteIcon className='user-ad__like-icon' />
            <span className='user-ad__statistic-value'>{props.likeCount}</span>
          </div>
          <div className='user-ad__state'>
            <span>{props.state}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAd;
