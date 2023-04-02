import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';

interface IPhotoPreviewProps {
  id: number;
  classNames?: string[];
  imagePath: string;
  onPhotoDelete?: (id: string) => void;
  onSetMainPhoto?: (id: string) => void;
}

export const PhotoPreview = (props: IPhotoPreviewProps) => {
  return (
    <div className={classNamesParser('photo-preview', props.classNames)}>
      <img src={props.imagePath} alt='image' className='photo-preview__photo' />
    </div>
  );
};
