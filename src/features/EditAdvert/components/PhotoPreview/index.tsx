import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface IPhotoPreviewProps {
  id: number;
  classNames?: string[];
  imagePath: string;
  onPhotoDelete?: (id: number) => void;
  onSetMainPhoto?: (id: number) => void;
}

export const PhotoPreview = (props: IPhotoPreviewProps) => {
  const handleDeleteClick = () => {
    props.onPhotoDelete && props.onPhotoDelete(props.id);
  };
  return (
    <div className={classNamesParser('photo-preview', props.classNames)}>
      <IconButton
        className='photo-preview__delete-btn'
        onClick={handleDeleteClick}>
        <Delete className='photo-preview__delete-icon' />
      </IconButton>
      <img
        src={props.imagePath}
        alt='advert new'
        className='photo-preview__photo'
      />
    </div>
  );
};
