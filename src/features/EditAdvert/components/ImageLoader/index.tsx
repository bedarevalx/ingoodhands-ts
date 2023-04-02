import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';

interface IImageLoaderProps {
  classNames?: string[];
}

const ImageLoader = (props: IImageLoaderProps) => {
  return (
    <div className={classNamesParser('image-loader', props.classNames)}></div>
  );
};

export default ImageLoader;
