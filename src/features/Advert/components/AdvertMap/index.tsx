import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';

interface IAdvertMapProps {
  classNames?: string[];
}

export const AdvertMap = (props: IAdvertMapProps) => {
  return (
    <div className={classNamesParser('advert-map', props.classNames)}></div>
  );
};
