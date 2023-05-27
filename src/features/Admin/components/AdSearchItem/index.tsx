import React from 'react';
import { IAdvertOnwer } from '../../../../interfaces/ads.interfaces';
import { AdsStatusTypes } from '../../../../types/general.types';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getLocaleAdsState } from '../../../../helpers/getLocaleAdsState';
import { getStateColor } from '../../../../helpers/getStateColor';

interface IAdSearchItemProps {
  title: string;
  description: string;
  createdAt: string;
  user?: IAdvertOnwer;
  status?: AdsStatusTypes;
  imagePath: string;
  id: number;
  variant: 'search' | 'pending';
  handleClick?: () => void;
}

export const AdSearchItem = (props: IAdSearchItemProps) => {
  return (
    <div className='ad-search-item' onClick={props.handleClick}>
      <div className='ad-search-item__image-container'>
        <img
          src={props.imagePath}
          className='ad-search-item__image'
          alt='searched-item'
        />
      </div>
      <div className='ad-search-item__info'>
        <h4 className='ad-search-item__title'>{props.title}</h4>
        <p className='ad-search-item__description'>{props.description}</p>
        {props.variant === 'search' && props.status && (
          <p
            className='ad-search-item__state'
            style={{ color: getStateColor(props.status) }}>
            {getLocaleAdsState(props.status)}
          </p>
        )}
        <p className='ad-search-item__date'>{props.createdAt}</p>
      </div>
      {props.variant === 'search' && (
        <IconButton className='ad-search-item__more-btn'>
          <MoreVertIcon className='ad-search-item__more-icon' />
        </IconButton>
      )}
    </div>
  );
};
