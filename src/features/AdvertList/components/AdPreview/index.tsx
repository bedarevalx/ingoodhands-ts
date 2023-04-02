import React from 'react';

interface IAdPreviewProps {
  imagePath: string;
  title: string;
  description: string;
  date: string;
}

const AdPreview = (props: IAdPreviewProps) => {
  return (
    <div className='ad-preview'>
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
    </div>
  );
};

export default AdPreview;
