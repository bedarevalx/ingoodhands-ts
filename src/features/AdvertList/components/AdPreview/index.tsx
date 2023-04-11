import { IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface IAdPreviewProps {
  id: number;
  imagePath: string;
  title: string;
  description: string;
  date: string;
  loadMoreCallback: ((el: HTMLDivElement) => void) | null;
  handleAddToFavorite: (id: number) => void;
  handleRemoveFromFavorite: (id: number) => void;
  isFavorite?: boolean;
  city: string;
}

const AdPreview = (props: IAdPreviewProps) => {
  const handleAddToFavorite = () => {
    const callback = props.isFavorite
      ? () => props.handleRemoveFromFavorite(props.id)
      : () => props.handleAddToFavorite(props.id);
    callback();
  };

  return (
    <div className='ad-preview' ref={props.loadMoreCallback}>
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
        <h3 className='ad-preview__title'>{props.title || 'Нет заголовка'}</h3>
        <p className='ad-preview__description'>
          {props.description || 'Нет описания'}
        </p>
        <IconButton
          onClick={handleAddToFavorite}
          className='ad-preview__favorite-btn'>
          <FavoriteIcon
            className={`ad-preview__favorite-icon ${
              props.isFavorite ? 'favorited' : ''
            }`}
          />
        </IconButton>
      </div>
      <p className='ad-preview__date'>{props.date}</p>
    </div>
  );
};

export default AdPreview;
