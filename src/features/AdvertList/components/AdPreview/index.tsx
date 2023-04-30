import { IconButton } from '@mui/material';
import React, { MouseEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RequiredRole from '../../../../hoc/RequiredRole';
import { Link, useNavigate } from 'react-router-dom';

interface IAdPreviewProps {
  id: number;
  imagePath: string;
  title: string;
  description: string;
  date: string;
  handleAddToFavorite: (id: number) => void;
  handleRemoveFromFavorite: (id: number) => void;
  isFavorite?: boolean;
  city: string;
}

export const AdPreview = (props: IAdPreviewProps) => {
  const navigate = useNavigate();
  const handleAddToFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const callback = props.isFavorite
      ? () => props.handleRemoveFromFavorite(props.id)
      : () => props.handleAddToFavorite(props.id);
    callback();
  };

  const handleAdClick = () => {
    navigate('/post/' + props.id);
  };

  return (
    <Link
      to={'/post/' + props.id}
      target='_blank'
      style={{ textDecoration: 'none' }}>
      <div className='ad-preview'>
        <div className='ad-preview__image-container'>
          <div className='ad-preview__city-wrapper'>
            <span className='ad-prevew__city'>{props.city}</span>
          </div>
          <img
            src={props.imagePath}
            alt='photo image'
            className='ad-preview__image'
          />
        </div>
        <div className='ad-preview__info'>
          <h3 className='ad-preview__title'>
            {props.title || 'Нет заголовка'}
          </h3>
          <p className='ad-preview__description'>
            {props.description || 'Нет описания'}
          </p>
          <RequiredRole>
            <IconButton
              onClick={handleAddToFavorite}
              className='ad-preview__favorite-btn'>
              <FavoriteIcon
                className={`ad-preview__favorite-icon ${
                  props.isFavorite ? 'favorited' : ''
                }`}
              />
            </IconButton>
          </RequiredRole>
        </div>
        <p className='ad-preview__date'>{props.date}</p>
      </div>
    </Link>
  );
};
