import React, { useEffect, useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { Carousel } from '../Carousel';

interface IAdvertPicturesProps {
  classNames?: string[];
  images: string[];
}

export const AdvertPictures = (props: IAdvertPicturesProps) => {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    setMainImage(props.images[0]);
  }, [props.images]);

  const handleImageClick = (imagePath: string) => {
    setMainImage(imagePath);
  };

  return (
    <div className={classNamesParser('advert-pictures', props.classNames)}>
      <div className='advert-pictures__main-image-wrapper'>
        <img
          src={mainImage}
          alt='image-post'
          className='advert-pictures__main-image'
        />
      </div>
      <div className='advert-pictures__rest-pictures-wrapper'>
        {props.images.map((image) => (
          <div
            className='advert-pictures__rest-image-container'
            onClick={() => handleImageClick(image)}>
            <img
              src={image}
              alt='image'
              className='advert-pictures__rest-image'
            />
          </div>
        ))}
      </div>
      <Carousel images={props.images} />
    </div>
  );
};
