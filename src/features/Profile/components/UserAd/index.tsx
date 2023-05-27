import React, { MouseEventHandler, MouseEvent } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdsStatusTypes } from '../../../../types/general.types';
import { ICategory } from '../../../../interfaces/general.interfaces';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { IPostReservation } from '../../../../interfaces/reservations.interfaces';
import { getLocaleAdsState } from '../../../../helpers/getLocaleAdsState';
import { getStateColor } from '../../../../helpers/getStateColor';

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
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  handleFavoriteClick?: (id: number, isFavorited: boolean) => void;
  onConfirmDeal?: (id: number) => void;
  reservation?: IPostReservation;
}

const UserAd = (props: IUserAdProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    props.handleFavoriteClick &&
      props.handleFavoriteClick(props.id, props?.isFavorited);
  };

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    props.onEdit && props.onEdit(props.id);
  };

  const handleDelete = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    props.onDelete && props.onDelete(props.id);
    setAnchorEl(null);
  };

  const handleConfirmDeal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onConfirmDeal &&
      !!props.reservation &&
      props.onConfirmDeal(props.reservation?.id);
  };
  return (
    <Link
      to={'/post/' + props.id}
      target='_blank'
      style={{ textDecoration: 'none', color: 'black' }}>
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
                {props.state && (
                  <div className='user-ad__state'>
                    <span style={{ color: getStateColor(props.state) }}>
                      {getLocaleAdsState(props.state)}
                    </span>
                  </div>
                )}
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
          {props.variant === 'my-ads' && props.state !== 'reserved' ? (
            <IconButton onClick={handleOpenMenu} className='user-ad__more-btn'>
              <MoreVert></MoreVert>
            </IconButton>
          ) : null}

          {props.state === 'reserved' &&
            props.reservation?.status === 'order' && (
              <IconButton
                onClick={handleConfirmDeal}
                className='user-ad__reservation-btn'>
                <CheckIcon className='user-ad__confirm' />
              </IconButton>
            )}
          <p className='user-ad__date'>{props.date}</p>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
          <MenuItem onClick={handleDelete}>Удалить</MenuItem>
        </Menu>
      </div>
    </Link>
  );
};

export default UserAd;
