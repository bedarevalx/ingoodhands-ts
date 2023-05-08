import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';
import Select from '../../UI/Select';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryItem from '../CategoryItem';

interface IFiltersHeaderProps {
  classNames?: string[];
}

const FiltersHeader = (props: IFiltersHeaderProps) => {
  const app = useAppSelector((state) => state.app);
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={classNamesParser(
        'filters-header ' + scrollDirection,
        props.classNames,
      )}>
      <h2 className='filters-header__title'>in good hands</h2>
      <h3 className='filters-header__sub-title'>
        сервис безвоздмездной передачи вещей
      </h3>
      <div className='filters-header__categories-wrapper'>
        <div className='filters-header__categories'>
          {app.categories.map((category) => (
            <CategoryItem
              category={category.title}
              id={category.id}
              icon={category.icon}
            />
          ))}
        </div>
      </div>

      <div className='filters-header__search-bar container'>
        <Select
          classNames={['filters-header__city-select']}
          options={app.cities}
          value='-1'
          placeholder='Выберите город'
        />
        <Input
          classNames={['filters-header__search-input']}
          placeholder='Введите название'
        />
        <Button classNames={['filters-header__search-btn']}>Найти</Button>
      </div>
    </div>
  );
};

export default FiltersHeader;
