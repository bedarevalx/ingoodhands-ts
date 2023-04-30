import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import Slider from 'react-slick';
import { AdPreview } from '../../../AdvertList';
import { useAppSelector } from '../../../../hooks/useRedux';
import { IAdPreview } from '../../../../interfaces/ads.interfaces';
import { Link } from 'react-router-dom';

interface ISimilarPostsProps {
  classNames?: string[];
  similarPosts: IAdPreview[];
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const SimilarPosts = (props: ISimilarPostsProps) => {
  return (
    <div className={classNamesParser('similar-adverts', props.classNames)}>
      <h3 className='similar-adverts__title'>Похожие объявления</h3>
      <div className='similar-adverts__slider-wrapper'>
        <Slider
          {...settings}
          className={'similar-adverts__slider'}
          nextArrow={false}
          arrows={false}
          prevArrow={false}>
          {props.similarPosts.map((post) => (
            <AdPreview
              id={post.id}
              title={post.title}
              imagePath={post.imagePath}
              description={post.descripton}
              date={post.date}
              city={post.city}
              handleAddToFavorite={() => {}}
              handleRemoveFromFavorite={() => {}}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
