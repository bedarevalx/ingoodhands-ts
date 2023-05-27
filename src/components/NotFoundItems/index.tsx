import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';

interface INotFoundItemsProps {
  classNames?: string[];
  icon?: string;
  text: string;
  hepler?: string;
}

const NotFoundItems = (props: INotFoundItemsProps) => {
  return (
    <div className={classNamesParser('not-found-item', props.classNames)}>
      {props.icon && <h3 className='not-found-item__icon'>{props.icon}</h3>}
      <p className='not-found-item__text'>{props.text}</p>
      <p className='not-found-item__helper'>{props.hepler}</p>
    </div>
  );
};

export default NotFoundItems;
