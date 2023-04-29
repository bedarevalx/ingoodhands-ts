import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import moment from 'moment';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IUserSearchItemProps {
  id: number;
  classNames?: string[];
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  rating: number;
  createdAt: string;
  isBanned: boolean;
}
export const UserSearchItem = (props: IUserSearchItemProps) => {
  return (
    <div className='user-search-item'>
      <div className='user-search-item__image-container'>
        <AccountCircleOutlinedIcon className='user-search-item__image' />
      </div>
      <div className='user-search-item__info'>
        <h4 className='user-search-item__email'>{props.email}</h4>
        <p className='user-search-item__phone-number'>{props.phoneNumber}</p>
        <p className='user-search-item__city'>{props.city}</p>
        <p className='user-search-item__date'>
          {moment(props.createdAt).format('DD MMMM YYYY')}
        </p>
      </div>
      <IconButton className='user-search-item__more-btn'>
        <MoreVertIcon className='user-search-item__more-icon' />
      </IconButton>
    </div>
  );
};
