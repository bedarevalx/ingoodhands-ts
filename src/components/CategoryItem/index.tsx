import React from 'react';
import Button from '../../UI/Button';
import { ToggleButton } from '@mui/material';

interface ICategoryItemProps {
  category: string;
  icon: string;
  id: number;
}

const CategoryItem = (props: ICategoryItemProps) => {
  return (
    <ToggleButton
      key={props.id}
      value={props.id}
      className='category-item__category-btn'>
      <span className='category-item__icon'>{props.icon}</span>
      <span className='category-item__title'>{props.category}</span>
    </ToggleButton>
  );
};

export default CategoryItem;
