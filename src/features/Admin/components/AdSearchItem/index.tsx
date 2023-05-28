import React from 'react';
import { IAdvertOnwer } from '../../../../interfaces/ads.interfaces';
import { AdsStatusTypes } from '../../../../types/general.types';
import { IconButton, Menu, MenuItem } from '@mui/material';
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
  variant: 'search' | 'pending' | 'review';
  idReview?: number;
  moderatorEmail?: string;
  handleClick?: () => void;
  onUnpublish?: (id: number) => void;
  onBan?: (id: number) => void;
  onUnban?: (id: number) => void;
  onCancelModeration?: (id: number) => void;
}

export const AdSearchItem = (props: IAdSearchItemProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBan = () => {
    props.onBan && props.onBan(props.id);
  };

  const handleUnpublish = () => {
    props.onUnpublish && props.onUnpublish(props.id);
  };

  const handleUnban = () => {
    props.onUnban && props.onUnban(props.id);
  };

  const handleCancelModeration = () => {
    props.onCancelModeration &&
      props.idReview &&
      props.onCancelModeration(props.idReview);
  };

  return (
    <div
      className='ad-search-item'
      onClick={props.variant === 'pending' ? props.handleClick : undefined}>
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
        {props.variant === 'review' && <p>{props.moderatorEmail}</p>}
      </div>
      {(props.variant === 'search' || props.variant === 'review') && (
        <IconButton
          className='ad-search-item__more-btn'
          onClick={handleMenuOpen}>
          <MoreVertIcon className='ad-search-item__more-icon' />
        </IconButton>
      )}
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {props.variant === 'review' && (
          <MenuItem onClick={handleCancelModeration}>
            Отменить проверку
          </MenuItem>
        )}
        {props.variant === 'search' &&
          (props.status === 'active' ||
            props.status === 'rejected' ||
            props.status === 'banned') && (
            <MenuItem onClick={handleUnpublish}>
              Отправить на модерацию
            </MenuItem>
          )}
        {props.variant === 'search' &&
          (props.status === 'banned' ? (
            <MenuItem onClick={handleUnban}>Разблокировать</MenuItem>
          ) : (
            <MenuItem onClick={handleBan}>Заблокировать</MenuItem>
          ))}
      </Menu>
    </div>
  );
};
