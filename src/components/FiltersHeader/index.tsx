import React, { useEffect, useState } from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';
import Select from '../../UI/Select';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryItem from '../CategoryItem';
import { AdsController } from '../../features/AdvertList/controllers/ads.controller';
import { useDispatch } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface IFiltersHeaderProps {
  classNames?: string[];
}

const FiltersHeader = (props: IFiltersHeaderProps) => {
  const dispatch = useDispatch();
  const app = useAppSelector((state) => state.app);
  const ads = useAppSelector((state) => state.ads);
  const controller = new AdsController(dispatch);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const { scrollDirection, scrollPosition, isScrollPositive } =
    useScrollDirection();

  useEffect(() => {
    (async () => {
      if (scrollPosition <= 0 && isScrollPositive) {
        setIsTitleVisible(true);
        return;
      } else {
        setIsTitleVisible(false);
        // await new Promise<void>((res) => {
        //   setTimeout(() => {
        //     res();
        //   }, 1000);
        // });
        return;
      }
    })();
  }, [scrollPosition]);

  return (
    <div
      className={classNamesParser(
        'filters-header ' + scrollDirection,
        props.classNames,
      )}>
      <div
        className={`filters-header__title-wrapper ${
          isTitleVisible ? '' : 'hide'
        }`}>
        <h2 className='filters-header__title'>in good hands</h2>
        <h3 className='filters-header__sub-title'>
          сервис безвоздмездной передачи вещей
        </h3>
      </div>

      <div className='filters-header__categories-wrapper'>
        <ToggleButtonGroup
          className='filters-header__categories'
          exclusive
          value={ads.idCategory}
          onChange={controller.handleChangeCategory}>
          {app.categories.map((category) => (
            <ToggleButton
              key={category.id}
              value={category.id}
              className={`filters-header__category-btn ${
                Number(ads.idCategory) === category.id ? 'toggled' : ''
              }`}>
              <span className='filters-header__category-icon'>
                {category.icon}
              </span>
              <span className='filters-header__category-title'>
                {category.title}
              </span>
            </ToggleButton>
            // <CategoryItem
            //   key={category.id}
            //   category={category.title}
            //   id={category.id}
            //   icon={category.icon}
            // />
          ))}
        </ToggleButtonGroup>
      </div>

      <div className='filters-header__search-bar container'>
        <Select
          classNames={['filters-header__city-select']}
          options={[
            { value: '-1', title: 'Все города', id: '-1' },
            ...app.cities,
          ]}
          onChange={controller.handleChangeCity}
          value={ads.idCity}
        />
        <Input
          classNames={['filters-header__search-input']}
          placeholder='Введите название'
          onInput={controller.handleChangeTitle}
          value={ads.title}
        />
        <Button
          classNames={['filters-header__search-btn']}
          onClick={controller.handleSearch}>
          Найти
        </Button>
      </div>
      <div className='filters-header__sorting'>
        <p>Сортировать по дате публикации</p>
      </div>
    </div>
  );
};

export default FiltersHeader;
