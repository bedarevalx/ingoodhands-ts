import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';

interface ICategoriesListProps {
  classNames?: string[];
}

export const CategoriesList = (props: ICategoriesListProps) => {
  const app = useAppSelector((state) => state.app);
  return (
    <div className={classNamesParser('categories-list', props.classNames)}>
      {app.categories.map((category) => (
        <p>
          {category.title} {category.icon}
        </p>
      ))}
    </div>
  );
};
