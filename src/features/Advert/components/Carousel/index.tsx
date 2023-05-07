import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import Modal from '../../../../UI/Modal';
import Slider from 'react-slick';

interface ICarouselProps {
  classNames?: string[];
  images: string[];
  isOpen: boolean;
  handleClose: () => void;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: 'linear',
  initialSlide: 1,
};

export const Carousel = (props: ICarouselProps) => {
  return (
    <Modal
      open={props.isOpen}
      handleClose={props.handleClose}
      classNames={['carousel']}>
      <Slider
        slidesToShow={1}
        slidesToScroll={1}
        className={'carousel__slider'}>
        {props.images.map((image) => (
          <div className='carousel__image-wrapper'>
            <img src={image} alt='post' className='carousel__image' />
          </div>
        ))}
      </Slider>
    </Modal>
  );
};
