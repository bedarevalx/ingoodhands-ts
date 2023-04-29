import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';

interface ICarouselProps {
  classNames?: string[];
  images: string[];
}

export const Carousel = (props: ICarouselProps) => {
  return <div className={classNamesParser('carousel', props.classNames)}></div>;
};
