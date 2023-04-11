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
      {/* <div className='ad-preview__image-container'> */}
      <img
        src={props.imagePath}
        alt='photo image'
        className='ad-preview__image'
      />
      {/* </div> */}
      <div className='ad-preview__info'>
        <h3 className='ad-preview__title'>{props.title || 'Нет заголовка'}</h3>
        <p className='ad-preview__description'>
          {props.description || 'Нет описания'}
        </p>
      </div>
      <IconButton onClick={handleAddToFavorite}>
        <FavoriteIcon color={props.isFavorite ? 'error' : 'action'} />
      </IconButton>
    </div>
  );
};

export default AdPreview;
