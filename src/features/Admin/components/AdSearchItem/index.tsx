import React from 'react';
import { IAdvertOnwer } from '../../../../interfaces/ads.interfaces';
import { AdsStatusTypes } from '../../../../types/general.types';
import moment from 'moment';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IAdSearchItemProps {
  title: string;
  description: string;
  createdAt: string;
  user: IAdvertOnwer;
  status: AdsStatusTypes;
  imagePath: string;
  id: number;
}

export const AdSearchItem = (props: IAdSearchItemProps) => {
  return (
    <div className='ad-search-item'>
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
        <p className='ad-search-item__state'>{props.status}</p>
        <p className='ad-search-item__date'>
          {moment(props.createdAt).format('DD MMMM YYYY')}
        </p>
      </div>
      <IconButton className='ad-search-item__more-btn'>
        <MoreVertIcon className='ad-search-item__more-icon' />
      </IconButton>
    </div>
  );
};
