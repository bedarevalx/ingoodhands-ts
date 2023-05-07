import React, { MouseEventHandler, MouseEvent } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdsStatusTypes } from '../../../../types/general.types';
import { ICategory } from '../../../../interfaces/general.interfaces';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
  onEdit?: () => void;
  onDelete?: () => void;
  handleFavoriteClick?: (id: number, isFavorited: boolean) => void;
}

const UserAd = (props: IUserAdProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleFavoriteClick = () => {
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
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
  };

  const handleDelete = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
  };
  return (
    <Link
      to={'/post/' + props.id}
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
          {props.variant === 'my-ads' ? (
            <IconButton onClick={handleOpenMenu} className='user-ad__more-btn'>
              <MoreVert></MoreVert>
            </IconButton>
          ) : null}
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
